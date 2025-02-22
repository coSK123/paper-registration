import express from 'express';
import { getActiveSemester } from '../controllers/semesterController,js';

const router = express.Router();

router.get('/', getActiveSemester);

export default router;