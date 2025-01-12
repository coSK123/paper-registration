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
    await checkDatabaseConnection(process.env.DB_HOST, 3306, 2000);
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database synchronized successfully.');
    connected = true;
  } catch (err) {
    if (retries < maxRetries && !connected) {
      retries += 1;
      console.log(`Retrying to connect to the database (${retries}/${maxRetries})...`);
      console.error('Error:', err.message);
      setTimeout(connectWithRetry, 5000); // wait 5 seconds before retrying
    } else if (!connected) {
      console.error('Unable to connect to the database after multiple attempts:', err);
    }
  }
};

export { sequelize, connectWithRetry };