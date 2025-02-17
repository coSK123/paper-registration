import express from 'express';
import { handleNewPaperIdea } from '../controllers/newPaperIdeaController.js';


const router = express.Router();

router.post('/', handleNewPaperIdea);

export default router;