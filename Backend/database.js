import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import net from 'net';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const maxRetries = 5;
let retries = 0;
let connected = false;

const checkDatabaseConnection = (host, port, timeout) => {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('Connection timed out'));
    });
    socket.on('error', (err) => {
      socket.destroy();
      reject(err);
    });
    socket.connect(port, host);
  });
};

const connectWithRetry = async () => {
  try {
    console.log(`Attempting to connect to the database. Attempt ${retries + 1}/${maxRetries}...`);
    
    // Check raw TCP connection first
    await checkDatabaseConnection(process.env.DB_HOST, 3306, 5000);
    console.log('TCP connection to the database succeeded.');

    // Try Sequelize authentication
    await sequelize.authenticate();
    console.log('Sequelize connection has been established successfully.');

    // Sync models
    await sequelize.sync();
    console.log('Database synchronized successfully.');
    connected = true;
  } catch (err) {
    retries++;
    console.error(`Database connection failed. Error: ${err.message}`);
    
    if (retries < maxRetries) {
      console.log(`Retrying to connect to the database in 5 seconds... (Attempt ${retries}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait before retrying
      await connectWithRetry(); // Recursive retry
    } else {
      console.error('Max retries reached. Unable to connect to the database.');
      process.exit(1); // Exit the process if retries fail
    }
  }
};


export { sequelize, connectWithRetry, checkDatabaseConnection };