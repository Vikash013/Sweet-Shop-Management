@echo off
echo 🍭 Sweet Shop Management System - TDD Test Runner
echo.
echo 🤖 Built with AI assistance (Amazon Q Developer)
echo.

echo Running Backend Tests...
cd backend
call npm test
if %errorlevel% neq 0 (
    echo ❌ Backend tests failed!
    exit /b 1
)
echo ✅ Backend tests passed!
echo.

echo Running Frontend Tests...
cd ..\frontend
call npm test -- --coverage --watchAll=false
if %errorlevel% neq 0 (
    echo ❌ Frontend tests failed!
    exit /b 1
)
echo ✅ Frontend tests passed!
echo.

echo 🎉 All tests passed! TDD cycle complete.
cd ..