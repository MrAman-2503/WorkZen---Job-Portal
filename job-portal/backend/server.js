const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// In-memory users and jobs data for demo purposes
const users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
  { id: 2, username: 'recruiter', password: 'recruiterpass', role: 'recruiter' },
  { id: 3, username: 'user', password: 'userpass', role: 'user' },
];

const jobs = [
  {
    id: 1,
    title: 'Sales Executive',
    description: 'Responsible for sales and client management.',
    location: 'New York',
    postedBy: 'recruiter',
    applicants: []
  },
  {
    id: 2,
    title: 'Marketing Intern',
    description: 'Assist marketing team with campaigns and research.',
    location: 'Remote',
    postedBy: 'recruiter',
    applicants: []
  },
  {
    id: 3,
    title: 'Software Developer',
    description: 'Develop and maintain web applications.',
    location: 'San Francisco',
    postedBy: 'recruiter',
    applicants: []
  },
  {
    id: 4,
    title: 'Customer Support',
    description: 'Provide customer support and service.',
    location: 'Work From Office',
    postedBy: 'recruiter',
    applicants: []
  },
  {
    id: 5,
    title: 'Data Analyst Intern',
    description: 'Analyze data and generate reports.',
    location: 'Work From Home',
    postedBy: 'recruiter',
    applicants: []
  }
];

const SECRET_KEY = 'your_secret_key';

// Middleware to authenticate token and set req.user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware to authorize roles
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

// Register route
app.post('/api/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password and role are required' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const newUser = { id: users.length + 1, username, password, role };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Get jobs (public)
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// Post a job (recruiter only)
app.post('/api/jobs', authenticateToken, authorizeRoles('recruiter'), (req, res) => {
  const { title, description, location } = req.body;
  if (!title || !description || !location) {
    return res.status(400).json({ message: 'Title, description and location are required' });
  }
  const newJob = { id: jobs.length + 1, title, description, location, postedBy: req.user.username };
  jobs.push(newJob);
  res.status(201).json({ message: 'Job posted successfully', job: newJob });
});

// Apply for a job (user only) with resume upload
app.post('/api/jobs/:id/apply', authenticateToken, authorizeRoles('user'), upload.single('resume'), (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = jobs.find(j => j.id === jobId);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  // Create application record
  const application = {
    userId: req.user.id,
    username: req.user.username,
    jobId: jobId,
    resumePath: req.file ? req.file.path : null,
    appliedAt: new Date()
  };
  
  // Add to job applicants
  if (!job.applicants) {
    job.applicants = [];
  }
  job.applicants.push(application);
  
  res.json({ 
    message: 'Applied to job successfully', 
    resumeUrl: req.file ? `/uploads/${req.file.filename}` : null 
  });
});

// Get job applicants (recruiter only)
app.get('/api/jobs/:id/applicants', authenticateToken, authorizeRoles('recruiter'), (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = jobs.find(j => j.id === jobId);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.json(job.applicants || []);
});

// Get resume file
app.get('/api/resume/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, 'uploads', filename));
});

// Admin route to get all users (admin only)
app.get('/api/users', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role })));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
