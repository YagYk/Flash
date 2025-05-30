@echo off
cls
echo Starting AI Notes Application...
echo.

echo Stopping any existing processes...
taskkill /f /im python.exe 2>nul
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak > nul

echo Starting backend server...
cd backend
start "Backend Server" cmd /k "python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload"
timeout /t 5 /nobreak > nul

echo Starting frontend server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo.
echo Servers started successfully!
echo Backend: http://127.0.0.1:8001
echo Frontend: http://localhost:5173
echo API Documentation: http://127.0.0.1:8001/docs
echo.
echo Press any key to close this window...
pause > nul 