# Funeraria Santa Margarita - Script de Backup Optimizado (Windows PowerShell)
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$rootPath = Get-Location
$backupDir = Join-Path -Path $rootPath -ChildPath "backup"
$zipFile = Join-Path -Path $backupDir -ChildPath "Funeraria_SM_Backup_$timestamp.zip"

# Carpetas y archivos a excluir para optimizar tamaño
$excludeList = @(
    "node_modules",
    ".next",
    "out",
    ".firebase",
    ".git",
    "backup",
    "firebase-debug.log"
)

Write-Host "Iniciando backup optimizado..." -ForegroundColor Cyan

# Creamos una lista de archivos a incluir (excluyendo la lista negra)
$itemsToInclude = Get-ChildItem -Path $rootPath | Where-Object { $excludeList -notcontains $_.Name }

# Carpeta temporal para empaquetado
$tempPath = Join-Path -Path $env:TEMP -ChildPath "backup_temp_$timestamp"
New-Item -ItemType Directory -Path $tempPath -Force | Out-Null

foreach ($item in $itemsToInclude) {
    Copy-Item -Path $item.FullName -Destination $tempPath -Recurse -Force
}

# Comprimimos el contenido
Compress-Archive -Path "$tempPath\*" -DestinationPath $zipFile -Force

# Limpieza
Remove-Item -Path $tempPath -Recurse -Force

Write-Host "✅ Backup finalizado: $zipFile" -ForegroundColor Green
