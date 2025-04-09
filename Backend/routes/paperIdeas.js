import express from 'express';
import { 
  getAllPaperIdeas,
  getPaperIdeaById,
  getProfessorPaperIdeas
} from '../controllers/paperIdeasController.js';

const router = express.Router();


router.get('/professor/:email', getProfessorPaperIdeas);


router.get('/', getAllPaperIdeas);

router.get('/:id', getPaperIdeaById);

export default router; 