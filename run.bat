@echo off
REM Navigate to the backend blockchain client directory
cd backend\blockchain\client

REM Activate the virtual environment
call venv\Scripts\activate

REM Start the Python backend in a new Command Prompt window
start cmd /k "python main.py"

REM Navigate back to the root directory
cd ../../../

REM Start the Next.js frontend in another new Command Prompt window
start cmd /k "npm run dev"
