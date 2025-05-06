# Advanced HTTP Server

A feature-rich HTTP server built with Node.js and Express, demonstrating various web development concepts and best practices.

## Features

- 🔐 JWT Authentication
- 📁 File Upload Support
- 🔒 Security Headers (Helmet)
- 📝 Request Logging (Morgan)
- ⚡ Rate Limiting
- 🌐 CORS Support
- 🚦 Error Handling
- 📄 API Documentation

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   JWT_SECRET=your-super-secret-key-change-this-in-production
   NODE_ENV=development
   ```
4. Create an 'uploads' directory in the root folder:
   ```bash
   mkdir uploads
   ```

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication

- POST `/auth/register` - Register a new user
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```

- POST `/auth/login` - Login and get JWT token
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```

### Protected Routes (Requires JWT Token)

- GET `/api/profile` - Get user profile
- POST `/api/upload` - Upload a file
  - Requires multipart/form-data with a file field named "file"

### Public Routes

- GET `/api/posts` - Get all posts
- GET `/api/posts/:id` - Get a specific post by ID

## Security Features

1. Password Hashing (bcrypt)
2. JWT Authentication
3. Rate Limiting
4. Security Headers
5. CORS Protection

## Error Handling

The server includes comprehensive error handling:
- Custom 404 Not Found responses
- Validation errors
- Server errors (500)
- Authentication errors

## Testing the API

You can test the API using tools like Postman or curl. Here are some example requests:

1. Register a new user:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user123","password":"password123"}'
```

2. Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user123","password":"password123"}'
```

3. Access protected route (replace TOKEN with your JWT token):
```bash
curl http://localhost:3000/api/profile \
  -H "Authorization: Bearer TOKEN"
```

## Best Practices Demonstrated

1. Environment Configuration
2. Middleware Usage
3. Route Organization
4. Security Implementation
5. Error Handling
6. Input Validation
7. File Upload Management
8. API Documentation 