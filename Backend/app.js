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
import User from './model/user.js'; 
import Semester from './model/semester.js'; 
import createPaperIdeaRoutes from './routes/createPaperIdea.js';
import paperIdeasRoutes from './routes/paperIdeas.js';
import activeSemesterRoutes from './routes/getActiveSemester.js';
import allSemestersRoutes from './routes/getSemesters.js';
import setActiveSemesterRoutes from './routes/setActiveSemester.js';
import keypointsRoutes from './routes/keypoints.js';
import { errorHandler } from './middleware/errorHandler.js';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/refresh', refreshRoutes);
app.use('/api/logout', logoutRoutes);
app.use(verifyJWT);
app.use('/api/paper', paperIdeasRoutes);
app.use('/api/paper', createPaperIdeaRoutes);
app.use('/api/users', getUsersRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/getActiveSemester', activeSemesterRoutes);
app.use('/api/allSemesters', allSemestersRoutes);
app.use('/api/setActiveSemester', setActiveSemesterRoutes);
app.use('/api/keypoints', keypointsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('test');
});


app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.path} not found` });
});


app.use(errorHandler);

const startServer = async () => {
  await connectWithRetry();
  if (sequelize) {
   
    const userCount = await User.count();
    if (userCount === 0) {
      try {
       
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