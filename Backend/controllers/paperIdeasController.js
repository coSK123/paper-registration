import { 
  getAllPaperIdeas as fetchAllPaperIdeas,
  getPaperIdeaById as fetchPaperIdeaById,
  getProfessorPaperIdeas as fetchProfessorPaperIdeas
} from '../database/getPaperIdeas.js';

/**
 * Get all paper ideas
 */
export const getAllPaperIdeas = async (req, res) => {
  try {
    const paperIdeas = await fetchAllPaperIdeas();
    return res.status(200).json(paperIdeas);
  } catch (err) {
    console.error('Error fetching paper ideas:', err);
    return res.status(500).json({ message: 'Failed to fetch paper ideas', error: err.message });
  }
};

/**
 * Get paper idea by ID
 */
export const getPaperIdeaById = async (req, res) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid paper idea ID' });
  }
  
  try {
    const paperIdea = await fetchPaperIdeaById(id);
    
    if (!paperIdea) {
      return res.status(404).json({ message: 'Paper idea not found' });
    }
    
    return res.status(200).json(paperIdea);
  } catch (err) {
    console.error(`Error fetching paper idea with ID ${id}:`, err);
    return res.status(500).json({ message: 'Failed to fetch paper idea', error: err.message });
  }
};

/**
 * Get paper ideas by professor email
 */
export const getProfessorPaperIdeas = async (req, res) => {
  const { email } = req.params;
  
  if (!email) {
    return res.status(400).json({ message: 'Email parameter is required' });
  }
  
  try {
    const professorPaperIdeas = await fetchProfessorPaperIdeas(email);
    
    return res.status(200).json(professorPaperIdeas);
  } catch (err) {
    console.error(`Error fetching paper ideas for professor ${email}:`, err);
    return res.status(500).json({ 
      message: 'Failed to fetch professor paper ideas', 
      error: err.message 
    });
  }
}; 