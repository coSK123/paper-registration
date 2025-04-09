import KeyPoint from '../model/keyPoints.js';

/**
 * Get all key points
 * @returns {Array} - Array of key points
 */
export async function getAllKeyPoints() {
  try {
    const keyPoints = await KeyPoint.findAll();
    return keyPoints.map(kp => ({
      id: kp.id,
      description: kp.description
    }));
  } catch (err) {
    console.error('Error fetching all key points:', err);
    throw err;
  }
}

/**
 * Transform key points data to a frontend-friendly format
 * @param {Array} paperIdeas - An array of paper ideas with associated key points
 * @returns {Array} - Transformed paper ideas with formatted key points
 */
export function formatKeyPointsForFrontend(paperIdeas) {
  if (!paperIdeas || !Array.isArray(paperIdeas)) {
    return [];
  }
  
  return paperIdeas.map(paperIdea => {
   
    const plainPaperIdea = paperIdea.get ? paperIdea.get({ plain: true }) : paperIdea;
    
   
    if (plainPaperIdea.KeyPoints && Array.isArray(plainPaperIdea.KeyPoints)) {
      plainPaperIdea.KeyPoints = plainPaperIdea.KeyPoints.map(kp => ({
        id: kp.id,
        description: kp.description
      }));
    } else {
      plainPaperIdea.KeyPoints = [];
    }
    
    return plainPaperIdea;
  });
}

/**
 * Format a single paper idea's key points for frontend
 * @param {Object} paperIdea - A single paper idea with associated key points
 * @returns {Object} - Transformed paper idea with formatted key points
 */
export function formatSinglePaperIdeaKeyPoints(paperIdea) {
  if (!paperIdea) {
    return null;
  }
  
 
  const plainPaperIdea = paperIdea.get ? paperIdea.get({ plain: true }) : paperIdea;

  if (plainPaperIdea.KeyPoints && Array.isArray(plainPaperIdea.KeyPoints)) {
    plainPaperIdea.KeyPoints = plainPaperIdea.KeyPoints.map(kp => ({
      id: kp.id,
      description: kp.description
    }));
  } else {
    plainPaperIdea.KeyPoints = [];
  }
  
  return plainPaperIdea;
} 