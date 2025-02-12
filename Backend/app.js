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
import { handleNewUser } from './controllers/registerController.js';

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
app.use('/api/users', getUsersRoutes);
app.use('/api/register', registerRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('test');
});

const startServer = async () => {
  await connectWithRetry();
  if (sequelize) {
    // Check if the User table is empty
    const userCount = await User.count();
    if (userCount === 0) {
      // Create an admin user if the table is empty
      const req = {
        body: {
          firstname: 'Admin',
          lastname: 'User',
          email: process.env.ADMIN,
          role: 'Administrator',
          password: process.env.ADMIN_PASSWORD,
        },
      };
      const res = {
        status: (code) => ({
          json: (message) => console.log(`Status: ${code}, Message:`, message),
        }),
      };
      await handleNewUser(req, res);
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
};

startServer();