@echo off

REM 执行后端
cd "YUEYUE-server"
start /b go run main.go


timeout /t 5

REM 执行前端
cd ".."
cd "YUEYUE-web"
start npm run dev
