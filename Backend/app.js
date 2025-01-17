import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize, connectWithRetry } from './database.js';
import verifyJWT from './middleware/verifyJWT.js';
import registerRoutes from './routes/register.js';
import authRoutes from './routes/auth.js';
import refreshRoutes from './routes/refresh.js';
import logoutRoutes from './routes/logout.js';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
import getUsersRoutes from './routes/getUsers.js';

const app = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(credentials);
app.use(express.json());
app.use(cookieParser());

app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/refresh', refreshRoutes);
app.use('/logout', logoutRoutes);
app.use(verifyJWT);
app.use('/users', getUsersRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('test');
});

const startServer = async () => {
  await connectWithRetry();
  if (sequelize) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
};

startServer();