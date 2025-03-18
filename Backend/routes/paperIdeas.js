import express from 'express';
import { 
  getAllPaperIdeas,
  getPaperIdeaById,
  getProfessorPaperIdeas
} from '../controllers/paperIdeasController.js';

const router = express.Router();

// Get paper ideas by professor email
// This specific route needs to come before the /:id route to prevent conflicts
router.get('/professor/:email', getProfessorPaperIdeas);

// Get all paper ideas
router.get('/', getAllPaperIdeas);

// Get paper idea by ID
router.get('/:id', getPaperIdeaById);

export default router; 