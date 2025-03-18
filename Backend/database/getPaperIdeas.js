import PaperEntry from '../model/paperEntry.js';
import KeyPoint from '../model/keyPoints.js';
import { Op } from 'sequelize';
import { 
  formatKeyPointsForFrontend, 
  formatSinglePaperIdeaKeyPoints 
} from './keyPointUtils.js';

/**
 * Get all paper ideas with their key points
 */
export async function getAllPaperIdeas() {
  try {
    const paperIdeas = await PaperEntry.findAll({
      include: [{ model: KeyPoint }],
      order: [['createdAt', 'DESC']]
    });
    
    return formatKeyPointsForFrontend(paperIdeas);
  } catch (err) {
    console.error('Error fetching all paper ideas:', err);
    throw err;
  }
}

/**
 * Get a paper idea by ID with its key points
 */
export async function getPaperIdeaById(id) {
  try {
    const paperIdea = await PaperEntry.findByPk(id, {
      include: [{ model: KeyPoint }]
    });
    
    return formatSinglePaperIdeaKeyPoints(paperIdea);
  } catch (err) {
    console.error(`Error fetching paper idea with ID ${id}:`, err);
    throw err;
  }
}

/**
 * Get paper ideas by professor email with their key points
 */
export async function getProfessorPaperIdeas(email) {
  try {
    const paperIdeas = await PaperEntry.findAll({
      where: { creator: email },
      include: [{ model: KeyPoint }],
      order: [['createdAt', 'DESC']]
    });
    
    return formatKeyPointsForFrontend(paperIdeas);
  } catch (err) {
    console.error(`Error fetching paper ideas for professor ${email}:`, err);
    throw err;
  }
} 