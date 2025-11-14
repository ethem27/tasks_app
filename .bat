@echo off
REM Bu dosya bulunduğu klasördeki projeyi çalıştırır ve tarayıcı açar
cd /d "%~dp0"
start "" npm run dev
timeout /t 3
start http://localhost:5173/
pause
