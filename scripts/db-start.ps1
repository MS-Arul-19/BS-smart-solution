# Starts the portable PostgreSQL bundled in .pg\ (no installation required).
# Run this before `npm run dev` in backend\.
$root = Split-Path $PSScriptRoot -Parent
$bin = Join-Path $root ".pg\pgsql\bin"
$data = Join-Path $root ".pg\data"

if (-not (Test-Path $bin)) {
  Write-Error "Portable PostgreSQL not found at $bin"
  exit 1
}

& "$bin\pg_ctl.exe" -D $data status 2>$null | Out-Null
if ($LASTEXITCODE -eq 0) {
  Write-Host "PostgreSQL is already running." -ForegroundColor Green
} else {
  & "$bin\pg_ctl.exe" -D $data -l (Join-Path $root ".pg\pg.log") -o "-p 5432" start
  Write-Host "PostgreSQL started on port 5432." -ForegroundColor Green
}
