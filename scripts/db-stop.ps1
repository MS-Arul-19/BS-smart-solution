# Stops the portable PostgreSQL bundled in .pg\.
$root = Split-Path $PSScriptRoot -Parent
& (Join-Path $root ".pg\pgsql\bin\pg_ctl.exe") -D (Join-Path $root ".pg\data") stop
