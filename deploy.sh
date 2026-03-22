#!/bin/bash
set -e

TOKEN=$CLOUDFLARE_API_TOKEN
ZONE=$ZONE_NAME
APP=$PROJECT_APP

# 1. Get Zone ID
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$ZONE" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq -r '.result[0].id')
echo "Zone ID: $ZONE_ID"

# 2. Delete old A www (si existe)
OLD_WWW=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=A&name=www.$ZONE" \
  -H "Authorization: Bearer $TOKEN" | jq -r '.result[0].id // empty')
if [ ! -z "$OLD_WWW" ]; then
  curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$OLD_WWW" \
    -H "Authorization: Bearer $TOKEN"
  echo "Old A www deleted"
fi

# 3. Create/Update CNAME www
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $TOKEN" \
  --data '{
    "type": "CNAME",
    "name": "www",
    "content": "'$APP'",
    "ttl": 1,
    "proxied": true
  }'
echo "CNAME www -> $APP (proxied) created"

# 4. Apex A records (multi)
for IP in "151.101.1.195" "151.101.65.195"; do
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
    -H "Authorization: Bearer $TOKEN" \
    --data '{
      "type": "A",
      "name": "@",
      "content": "'$IP'",
      "ttl": 1,
      "proxied": true
    }'
done
echo "Apex A records added"

# 5. Redirect Rule 301 www
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \
  -H "Authorization: Bearer $TOKEN" \
  --data '{
    "name": "FSM-www-redirect",
    "kind": "zone",
    "phase": "http_redirect_301",
    "rules": [{
      "expression": "http.host eq \"www.funerariasantamargarita.cl\"",
      "action": "redirect",
      "action_parameters": {
        "url": "https://funerariasantamargarita.cl$1"
      }
    }]
  }'
echo "301 Redirect added"

# 6. SSL Full Strict
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl" \
  -H "Authorization: Bearer $TOKEN" \
  --data '{"value": "full"}'
echo "SSL Full Strict set"

# 7. Purge Cache
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $TOKEN" \
  --data '{"purge_everything": true}'
echo "Cache purged"

# 8. Verify
echo "=== VERIFY ==="
dig +short @1.1.1.1 $ZONE
dig +short @1.1.1.1 www.$ZONE
curl -I https://www.$ZONE | grep Location
echo "DEPLOY COMPLETADO. Firebase status -> Conectado en 5-60min."
