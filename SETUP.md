# Quick Setup Guide

## Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL Server

## Setup Steps

1. **Clone and navigate to project**
   ```bash
   git clone <repository-url>
   cd ai-notes
   ```

2. **Environment setup**
   ```bash
   cp .env.template .env
   cp backend/.env.template backend/.env
   ```
   Edit both `.env` files with your MySQL and API credentials.

3. **Backend setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python setup_mysql.py
   cd ..
   ```

4. **Frontend setup**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. **Start application**
   ```bash
   start.bat
   ```

## Required Environment Variables

### MySQL Database
- `MYSQL_HOST=localhost`
- `MYSQL_PORT=3306`
- `MYSQL_USER=root`
- `MYSQL_PASSWORD=your_password`
- `MYSQL_DATABASE=flash_notes`

### Authentication
- `SECRET_KEY=your_random_secret_key`
- `ALGORITHM=HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES=30`

### AI Service (Optional)
- `GOOGLE_API_KEY=your_gemini_api_key`
- `AI_PROVIDER=google`
- `GEMINI_MODEL=gemini-2.0-flash`

## Access URLs
- Frontend: http://localhost:5173
- Backend: http://127.0.0.1:8001
- API Docs: http://127.0.0.1:8001/docs 