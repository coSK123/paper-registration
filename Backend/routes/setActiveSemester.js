import express from 'express';
import { activateSemester } from '../controllers/semesterController.js';


const router = express.Router();

router.post('/', activateSemester);

export default router;