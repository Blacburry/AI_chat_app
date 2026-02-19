@echo off
echo Starting Ngrok Tunnel for AI Chat App (Direct to Port 1234)...
echo =======================

echo Launching Ngrok Tunnel (above-grizzly-officially.ngrok-free.app -> Port 1234)...
start "Ngrok Tunnel" cmd /k "ngrok http --domain=above-grizzly-officially.ngrok-free.app 1234"

echo =======================
echo DONE! 
echo Ngrok is now forwarding to localhost:1234 (e.g., LM Studio).
echo Access at: https://above-grizzly-officially.ngrok-free.app
pause
