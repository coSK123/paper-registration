import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize, connectWithRetry } from './database.js';
import {verifyJWT} from './middleware/verifyJWT.js';
import registerRoutes from './routes/register.js';
import authRoutes from './routes/auth.js';
import refreshRoutes from './routes/refresh.js';
import logoutRoutes from './routes/logout.js';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
import getUsersRoutes from './routes/getUsers.js';
import User from './model/user.js'; // Import the User model
import PaperEntry from './model/paperEntry.js'; // Import PaperEntry model
import KeyPoint from './model/keyPoints.js'; // Import KeyPoint model
import PaperKeyPoint from './model/paperKeyPoint.js'; // Import PaperKeyPoint model (this will establish the associations)
import Semester from './model/semester.js'; // Import Semester model
import { handleNewUser } from './controllers/registerController.js';
import createPaperIdeaRoutes from './routes/createPaperIdea.js';
import paperIdeasRoutes from './routes/paperIdeas.js';
import activeSemesterRoutes from './routes/getActiveSemester.js';
import allSemestersRoutes from './routes/getSemesters.js';
import setActiveSemesterRoutes from './routes/setActiveSemester.js';
import { errorHandler } from './middleware/errorHandler.js';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Auth routes that don't require JWT verification
app.use('/api/auth', authRoutes);
app.use('/api/refresh', refreshRoutes);
app.use('/api/logout', logoutRoutes);

// Apply JWT verification middleware to protected routes
app.use(verifyJWT);

// Paper routes - ensure specific routes come before generic ones
// Use the paperIdeas routes for GET requests
app.use('/api/paper', paperIdeasRoutes);
// Use the createPaperIdea routes for POST requests
app.use('/api/paper', createPaperIdeaRoutes);

// Other protected routes
app.use('/api/users', getUsersRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/getActiveSemester', activeSemesterRoutes);
app.use('/api/allSemesters', allSemestersRoutes);
app.use('/api/setActiveSemester', setActiveSemesterRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('test');
});

// Add 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.path} not found` });
});

// Add global error handler
app.use(errorHandler);

const startServer = async () => {
  await connectWithRetry();
  if (sequelize) {
    // Check if the User table is empty
    const userCount = await User.count();
    if (userCount === 0) {
      try {
        // Create an admin user directly instead of using the controller
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || '1234', 10);
        await User.create({
          firstname: 'Admin',
          lastname: 'User',
          email: process.env.ADMIN || 'admin@gmail.com',
          role: 'Administrator',
          password: hashedPassword,
        });
        console.log('Admin user created successfully');
      } catch (err) {
        console.error('Error creating admin user:', err.message);
      }
    }

    // Check if there are any semesters, if not create a default one
    const semesterCount = await Semester.count();
    if (semesterCount === 0) {
      try {
        const defaultSemester = await Semester.create({
          name: 'Summer 2025',
          active: true
        });
        console.log('Default semester created successfully:', defaultSemester.id);
      } catch (err) {
        console.error('Error creating default semester:', err.message);
      }
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
};

startServer();