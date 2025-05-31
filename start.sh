#!/bin/bash

echo "Starting AI Notes Application..."
echo

echo "Stopping any existing processes..."
pkill -f "uvicorn"
pkill -f "npm"
sleep 2

echo "Starting backend server..."
cd backend
source venv/bin/activate
nohup python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload > ../backend.log 2>&1 &
deactivate
sleep 3

echo "Starting frontend server..."
cd ../frontend
nohup npm run dev -- --host 0.0.0.0 --port 5173 > ../frontend.log 2>&1 &
cd ..

echo
echo "Servers started successfully!"
echo "Backend: http://your-ec2-ip:8001"
echo "Frontend: http://your-ec2-ip:5173"
echo "API Documentation: http://your-ec2-ip:8001/docs"
echo
echo "Logs:"
echo "Backend: tail -f backend.log"
echo "Frontend: tail -f frontend.log"
echo
echo "To stop servers:"
echo "pkill -f uvicorn"
echo "pkill -f npm" 