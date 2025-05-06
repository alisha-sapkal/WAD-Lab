import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // Request logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Mock user database
const users = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Advanced HTTP Server',
    endpoints: {
      auth: [
        { method: 'POST', path: '/auth/register', description: 'Register a new user' },
        { method: 'POST', path: '/auth/login', description: 'Login to get JWT token' }
      ],
      protected: [
        { method: 'GET', path: '/api/profile', description: 'Get user profile (requires auth)' },
        { method: 'POST', path: '/api/upload', description: 'Upload a file (requires auth)' }
      ],
      public: [
        { method: 'GET', path: '/api/posts', description: 'Get all posts' },
        { method: 'GET', path: '/api/posts/:id', description: 'Get a specific post' }
      ]
    }
  });
});

// Authentication routes
app.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };
    users.push(user);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 
      process.env.JWT_SECRET || 'your-secret-key', 
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Protected routes
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ 
    message: 'File uploaded successfully',
    file: req.file 
  });
});

// Public routes
const posts = [
  { id: 1, title: 'First Post', content: 'Hello World!' },
  { id: 2, title: 'Second Post', content: 'Another post' }
];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the API documentation at http://localhost:${PORT}`);
}); 