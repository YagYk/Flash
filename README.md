# AI-Powered Note Taking Application

A modern, full-stack web application that allows users to create, manage, and automatically summarize notes using AI technology. Built with FastAPI backend and React frontend.

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Note Management**: Create, read, update, and delete personal notes
- **AI Summarization**: Automatic note summarization using Google's Gemini AI via LangChain
- **Real-time Interface**: Responsive React frontend with modern UI
- **Secure Storage**: MySQL database with proper data validation
- **RESTful API**: Well-documented API endpoints with automatic documentation

## Technology Stack

### Backend
- **FastAPI**: Modern Python web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM for database operations
- **MySQL**: Relational database for data persistence
- **JWT**: JSON Web Tokens for secure authentication
- **Passlib**: Password hashing library with bcrypt
- **LangChain**: Framework for developing applications with LLMs
- **Google Gemini AI**: Advanced language model for text summarization

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API communication
- **CSS3**: Custom styling with responsive design

### Development Tools
- **Uvicorn**: ASGI server for running FastAPI applications
- **npm**: Package manager for frontend dependencies
- **Python-dotenv**: Environment variable management

## Project Structure

```
ai-notes/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration and connection
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic schemas for data validation
│   ├── ai_service.py        # LangChain-powered AI summarization service
│   ├── setup_mysql.py       # Database setup script
│   ├── requirements.txt     # Python dependencies
│   └── .env.template        # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service functions
│   │   └── styles/          # CSS stylesheets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── start.bat               # Application startup script
├── .env.template           # Root environment template
└── README.md              # Project documentation
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- MySQL Server
- Git

### Database Setup
1. Install and start MySQL Server
2. Create a database named `flash_notes`
3. Note your MySQL credentials (host, port, username, password)

### Environment Configuration
1. Copy `.env.template` to `.env` in the root directory
2. Copy `backend/.env.template` to `backend/.env`
3. Update both `.env` files with your configuration:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=flash_notes

SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

GOOGLE_API_KEY=your_google_gemini_api_key
AI_PROVIDER=google
GEMINI_MODEL=gemini-2.0-flash
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python setup_mysql.py
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Running the Application

### Quick Start (Windows)
```bash
start.bat
```

### Manual Start
1. **Backend**:
   ```bash
   cd backend
   python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

### Access Points
- **Frontend Application**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8001
- **API Documentation**: http://127.0.0.1:8001/docs

## API Endpoints

### Authentication
- `POST /register` - Create new user account
- `POST /token` - User login and JWT token generation

### Notes Management
- `GET /notes` - Retrieve all user notes
- `POST /notes` - Create new note with AI summary
- `GET /notes/{id}` - Get specific note by ID
- `DELETE /notes/{id}` - Delete specific note

### System
- `GET /` - API health check

## Database Schema

### Users Table
- `id`: Primary key
- `username`: Unique username
- `hashed_password`: Bcrypt hashed password
- `created_at`: Account creation timestamp

### Notes Table
- `id`: Primary key
- `title`: Note title
- `content`: Note content
- `summary`: AI-generated summary
- `user_id`: Foreign key to users table
- `created_at`: Note creation timestamp

## Security Features

- **Password Hashing**: Bcrypt algorithm for secure password storage
- **JWT Authentication**: Stateless authentication with configurable expiration
- **CORS Protection**: Configured for specific frontend origins
- **Input Validation**: Pydantic schemas for request/response validation
- **SQL Injection Prevention**: SQLAlchemy ORM with parameterized queries

## AI Integration

The application integrates with Google's Gemini AI model through LangChain for automatic note summarization. When a note is created, the system:

1. Uses LangChain's `ChatGoogleGenerativeAI` to interface with Gemini API
2. Structures the prompt using LangChain's `HumanMessage` schema
3. Sends the note content for AI summarization
4. Receives and stores the AI-generated summary
5. Provides fallback text truncation if AI service is unavailable

### LangChain Benefits:
- **Unified Interface**: Consistent API across different AI providers
- **Built-in Error Handling**: Automatic retries and exception management
- **Message Standardization**: Structured prompt formatting
- **Easy Provider Switching**: Can easily switch from Gemini to other LLMs

## Configuration Options

### AI Service
- Enable/disable AI summarization
- Configure AI model parameters via LangChain
- Fallback to basic text truncation

### Authentication
- Configurable JWT secret key
- Adjustable token expiration time
- Support for different hashing algorithms

### Database
- MySQL connection configuration
- Connection pool settings
- Echo SQL queries for debugging

## Development Guidelines

### Code Quality
- **Type Hints**: Python functions include proper type annotations
- **Error Handling**: Comprehensive exception handling throughout
- **Separation of Concerns**: Clear separation between API, business logic, and data layers
- **RESTful Design**: Following REST principles for API endpoints

### Testing Considerations
- API endpoints can be tested using the built-in FastAPI documentation
- Database operations use transactions for data integrity
- Authentication flows are properly secured

## Deployment Considerations

### Production Environment
- Use environment variables for all sensitive configuration
- Configure proper CORS origins for production domains
- Set up SSL/TLS certificates for HTTPS
- Use production-grade ASGI server (e.g., Gunicorn with Uvicorn workers)
- Implement proper logging and monitoring

### Scalability
- Database connection pooling configured
- Stateless authentication allows horizontal scaling
- AI service calls can be cached or queued for better performance

## Troubleshooting

### Common Issues
1. **Database Connection Errors**: Verify MySQL is running and credentials are correct
2. **AI Summarization Not Working**: Check Google Gemini API key validity
3. **Frontend Not Loading**: Ensure both backend and frontend servers are running
4. **CORS Errors**: Verify frontend URL is in CORS allowed origins

### Logs and Debugging
- Backend logs appear in the terminal running the FastAPI server
- Frontend logs are available in browser developer tools
- Database query logging can be enabled by setting `echo=True` in database configuration

## Contributing

This project follows standard software development practices:
- Clean, readable code with proper documentation
- Consistent naming conventions
- Error handling and input validation
- Security best practices
- Scalable architecture patterns

---

**Note**: This application is designed as a demonstration of full-stack development skills, showcasing modern web technologies, AI integration via LangChain, and best practices in software engineering. 