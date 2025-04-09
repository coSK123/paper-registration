import express from 'express';
import { getAllKeyPoints } from '../controllers/keypointsController.js';

const router = express.Router();

router.get('/', getAllKeyPoints);

export default router; 