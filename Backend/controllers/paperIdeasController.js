import { 
  getAllPaperIdeas as fetchAllPaperIdeas,
  getPaperIdeaById as fetchPaperIdeaById,
  getProfessorPaperIdeas as fetchProfessorPaperIdeas
} from '../database/getPaperIdeas.js';
import { getPaperIdeas } from '../database/paperIdeaUtils.js';

export const getAllPaperIdeas = async (req, res) => {
  try {
    // Extract filter parameters from query
    const filters = {
      groupSize: req.query.groupSize,
      keyPointIds: req.query.keyPointIds ? req.query.keyPointIds.split(',').map(id => parseInt(id)) : undefined,
      semesterId: req.query.semesterId ? parseInt(req.query.semesterId) : undefined,
      titleSearch: req.query.titleSearch,
      activeSemesterOnly: req.query.activeSemesterOnly !== 'false'
    };
    
    const paperIdeas = await fetchAllPaperIdeas(filters);
    return res.status(200).json(paperIdeas);
  } catch (err) {
    console.error('Error fetching paper ideas:', err);
    return res.status(500).json({ message: 'Failed to fetch paper ideas', error: err.message });
  }
};

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

export const getProfessorPaperIdeas = async (req, res) => {
  const { email } = req.params;
  
  if (!email) {
    return res.status(400).json({ message: 'Email parameter is required' });
  }
  
  try {
    // Extract filter parameters from query
    const filters = {
      groupSize: req.query.groupSize,
      keyPointIds: req.query.keyPointIds ? req.query.keyPointIds.split(',').map(id => parseInt(id)) : undefined,
      semesterId: req.query.semesterId ? parseInt(req.query.semesterId) : undefined,
      titleSearch: req.query.titleSearch,
      activeSemesterOnly: req.query.activeSemesterOnly !== 'false'
    };
    
    const professorPaperIdeas = await fetchProfessorPaperIdeas(email, filters);
    
    return res.status(200).json(professorPaperIdeas);
  } catch (err) {
    console.error(`Error fetching paper ideas for professor ${email}:`, err);
    return res.status(500).json({ 
      message: 'Failed to fetch professor paper ideas', 
      error: err.message 
    });
  }
};

export const getPaperIdeasController = async (req, res) => {
  try {
    const { titleSearch, groupSize, keyPointIds, semesterId, activeSemesterOnly } = req.query;
    
    const filters = {
      titleSearch: titleSearch || '',
      groupSize: groupSize ? parseInt(groupSize) : null,
      keyPointIds: keyPointIds ? keyPointIds.split(',').map(id => parseInt(id)) : [],
      semesterId: semesterId ? parseInt(semesterId) : null,
      activeSemesterOnly: activeSemesterOnly === 'true'
    };

    const paperIdeas = await getPaperIdeas(filters);
    res.json(paperIdeas);
  } catch (error) {
    console.error('Error fetching paper ideas:', error);
    res.status(500).json({ message: 'Error fetching paper ideas' });
  }
}; 