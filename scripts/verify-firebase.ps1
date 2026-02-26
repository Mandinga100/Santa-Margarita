# Scripts de Verificación de Entorno Firebase para Windows 10
# Propósito: Asegurar que el CLI de Firebase apunta al proyecto y cuenta correctos.

$TARGET_PROJECT = "funeraria-sm"
$TARGET_EMAIL = "funerariasantamargarita2026@gmail.com"

Write-Host "[CHECK] Verificando entorno Firebase..." -ForegroundColor Cyan

# 1. Verificar si Firebase CLI está instalado
if (!(Get-Command firebase -ErrorAction SilentlyContinue)) {
    Write-Error "[ERROR] Firebase CLI no está instalado o no se encuentra en el PATH."
    exit 1
}

# 2. Obtener lista de logins
Write-Host "[USER] Revisando cuentas autenticadas..." -ForegroundColor Yellow
$logins = firebase login:list

if ($logins -match $TARGET_EMAIL) {
    Write-Host "[OK] Cuenta $TARGET_EMAIL detectada." -ForegroundColor Green
    # Intentar usar la cuenta si no es la activa
    if (!($logins -match "> $TARGET_EMAIL")) {
        Write-Host "[SWITCH] Cambiando a la cuenta $TARGET_EMAIL..." -ForegroundColor Cyan
        firebase login:use $TARGET_EMAIL
    }
}
else {
    Write-Host "[WARN] Cuenta $TARGET_EMAIL no encontrada en la sesión actual." -ForegroundColor Red
    Write-Host "Por favor, ejecuta: firebase login" -ForegroundColor Yellow
    exit 1
}

# 3. Verificar Proyecto Actual
Write-Host "[PROJECT] Verificando proyecto asignado..." -ForegroundColor Yellow
$projects = firebase projects:list

if ($projects -match "$TARGET_PROJECT \(current\)") {
    Write-Host "[OK] Ya estás en el proyecto: $TARGET_PROJECT" -ForegroundColor Green
}
else {
    Write-Host "[SWITCH] Cambiando al proyecto: $TARGET_PROJECT..." -ForegroundColor Cyan
    firebase use $TARGET_PROJECT
    
    # Doble verificación
    $check = firebase projects:list
    if ($check -match "$TARGET_PROJECT \(current\)") {
        Write-Host "[OK] Cambio exitoso a $TARGET_PROJECT." -ForegroundColor Green
    }
    else {
        Write-Error "[ERROR] No se pudo cambiar al proyecto $TARGET_PROJECT."
        exit 1
    }
}

Write-Host "READY: Entorno operativo en $TARGET_PROJECT ($TARGET_EMAIL)" -ForegroundColor Blue
