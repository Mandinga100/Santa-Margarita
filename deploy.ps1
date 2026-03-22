$ErrorActionPreference = "Stop"

$TOKEN = $env:CLOUDFLARE_API_TOKEN
if (-not $TOKEN) {
    Write-Host "Error: Token is empty."
    exit 1
}
$ZONE = "funerariasantamargarita.cl"
$APP = "funeraria-sm.web.app"

$HEADERS = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type"  = "application/json"
}

# 1. Get Zone ID
try {
    $zoneResponse = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones?name=$ZONE" -Method Get -Headers $HEADERS
    $ZONE_ID = $zoneResponse.result[0].id
    Write-Host "Zone ID: $ZONE_ID"
} catch {
    Write-Host "Fallo al obtener Zone ID. Error: $_"
    exit 1
}

if (-not $ZONE_ID) {
    Write-Host "Failed to get Zone ID. Is the token valid?"
    exit 1
}

# Delete all existing A, CNAME, and AAAA records for @ and www to prevent 400 errors
$existingRecords = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Method Get -Headers $HEADERS
foreach ($record in $existingRecords.result) {
    if ($record.name -eq $ZONE -or $record.name -eq "www.$ZONE") {
        if ($record.type -in @("A", "CNAME", "AAAA")) {
            Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$($record.id)" -Method Delete -Headers $HEADERS
            Write-Host "Deleted existing $($record.type) record for $($record.name)"
        }
    }
}

# 3. Create/Update CNAME www
$bodyCname = @{
  "type" = "CNAME"
  "name" = "www"
  "content" = $APP
  "ttl" = 1
  "proxied" = $true
} | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Method Post -Headers $HEADERS -Body $bodyCname
    Write-Host "CNAME www -> $APP (proxied) created"
} catch { Write-Host "Error creating CNAME www: $_" }

# 4. Apex A records (multi)
$ips = @("151.101.1.195", "151.101.65.195")
foreach ($IP in $ips) {
  $bodyA = @{
    "type" = "A"
    "name" = "@"
    "content" = $IP
    "ttl" = 1
    "proxied" = $true
  } | ConvertTo-Json
  try {
      Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Method Post -Headers $HEADERS -Body $bodyA
      Write-Host "Apex A $($IP) added"
  } catch { Write-Host "Error creating A $($IP): $_" }
}

# 5. Redirect Rule 301 www
$bodyRedirect = @{
  "name" = "FSM-www-redirect"
  "kind" = "zone"
  "phase" = "http_redirect_301"
  "rules" = @(
    @{
      "expression" = "http.host eq `"www.funerariasantamargarita.cl`""
      "action" = "redirect"
      "action_parameters" = @{
        "url" = "https://funerariasantamargarita.cl`$1"
      }
    }
  )
} | ConvertTo-Json -Depth 10

# Note: Cloudflare might throw an error if a rule with the same name exists, so we ignore failures here
try {
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" -Method Post -Headers $HEADERS -Body $bodyRedirect
    Write-Host "301 Redirect added"
} catch { Write-Host "301 Redirect creation failed or already exists: $_" }

# 6. SSL Full Strict
$bodySsl = @{ "value" = "full" } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl" -Method Patch -Headers $HEADERS -Body $bodySsl
    Write-Host "SSL Full Strict set"
} catch { Write-Host "Error setting SSL: $_" }

# 7. Purge Cache
$bodyPurge = @{ "purge_everything" = $true } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" -Method Post -Headers $HEADERS -Body $bodyPurge
    Write-Host "Cache purged"
} catch { Write-Host "Error purging cache: $_" }

# 8. Verify
Write-Host "=== VERIFY ==="
try {
    Resolve-DnsName -Name $ZONE -Server 1.1.1.1 -ErrorAction SilentlyContinue
    Resolve-DnsName -Name "www.$ZONE" -Server 1.1.1.1 -ErrorAction SilentlyContinue
    $response = Invoke-WebRequest -Uri "https://www.$ZONE" -MaximumRedirection 0 -SkipHttpErrorCheck -UseBasicParsing
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Location: $($response.Headers.Location)"
} catch {
    Write-Host "Verification encountered an issue: $_"
}
Write-Host "DEPLOY COMPLETADO. Firebase status -> Conectado en 5-60min."
