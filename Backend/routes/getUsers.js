import express from 'express';
import { getUsers } from '../database/getUsers.js';

const router = express.Router();

router.get('/', getUsers);

export default router;