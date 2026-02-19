@echo off
echo Starting AI Chat App...
echo =======================

echo 1. Launching Node.js Server (Port 3000)...
start "AI App Server" cmd /k "node server.js"

echo 2. Launching Ngrok Tunnel (above-grizzly-officially.ngrok-free.app)...
start "Ngrok Tunnel" cmd /k "ngrok http --domain=above-grizzly-officially.ngrok-free.app 3000"

echo =======================
echo DONE! 
echo Please ensure LM Studio is running on Port 1234.
echo Access your app at: https://above-grizzly-officially.ngrok-free.app
pause
