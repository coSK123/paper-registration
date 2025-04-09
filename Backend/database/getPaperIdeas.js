import PaperEntry from '../model/paperEntry.js';
import KeyPoint from '../model/keyPoints.js';
import { Op } from 'sequelize';
import { 
  formatKeyPointsForFrontend, 
  formatSinglePaperIdeaKeyPoints 
} from './keyPointUtils.js';
import Semester from '../model/semester.js';

export async function getAllPaperIdeas(filters = {}) {
  try {
    const { 
      groupSize, 
      keyPointIds, 
      semesterId, 
      titleSearch,
      activeSemesterOnly = true
    } = filters;
    
    // Build the where clause
    const whereClause = {};
    
    // Add group size filter if provided
    if (groupSize) {
      whereClause.groupSize = groupSize;
    }
    
    // Add title search if provided
    if (titleSearch) {
      whereClause.title = {
        [Op.like]: `%${titleSearch}%`
      };
    }
    
    // Add semester filter if provided
    if (semesterId) {
      whereClause.semesterId = semesterId;
    } else if (activeSemesterOnly) {
      // If no semester specified and activeSemesterOnly is true, filter by active semester
      const activeSemester = await Semester.findOne({ where: { active: true } });
      if (activeSemester) {
        whereClause.semesterId = activeSemester.id;
      }
    }
    
    // Build the include clause
    const includeClause = [{ model: KeyPoint }];
    
    // Add keypoint filter if provided
    if (keyPointIds && keyPointIds.length > 0) {
      includeClause[0].where = {
        id: {
          [Op.in]: keyPointIds
        }
      };
    }
    
    const paperIdeas = await PaperEntry.findAll({
      where: whereClause,
      include: includeClause,
      order: [['createdAt', 'DESC']]
    });
    
    return formatKeyPointsForFrontend(paperIdeas);
  } catch (err) {
    console.error('Error fetching all paper ideas:', err);
    throw err;
  }
}


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

export async function getProfessorPaperIdeas(email, filters = {}) {
  try {
    const { 
      groupSize, 
      keyPointIds, 
      semesterId, 
      titleSearch,
      activeSemesterOnly = true
    } = filters;
    
    // Build the where clause
    const whereClause = { creator: email };
    
    // Add group size filter if provided
    if (groupSize) {
      whereClause.groupSize = groupSize;
    }
    
    // Add title search if provided
    if (titleSearch) {
      whereClause.title = {
        [Op.like]: `%${titleSearch}%`
      };
    }
    
    // Add semester filter if provided
    if (semesterId) {
      whereClause.semesterId = semesterId;
    } else if (activeSemesterOnly) {
      // If no semester specified and activeSemesterOnly is true, filter by active semester
      const activeSemester = await Semester.findOne({ where: { active: true } });
      if (activeSemester) {
        whereClause.semesterId = activeSemester.id;
      }
    }
    
    // Build the include clause
    const includeClause = [{ model: KeyPoint }];
    
    // Add keypoint filter if provided
    if (keyPointIds && keyPointIds.length > 0) {
      includeClause[0].where = {
        id: {
          [Op.in]: keyPointIds
        }
      };
    }
    
    const paperIdeas = await PaperEntry.findAll({
      where: whereClause,
      include: includeClause,
      order: [['createdAt', 'DESC']]
    });
    
    return formatKeyPointsForFrontend(paperIdeas);
  } catch (err) {
    console.error(`Error fetching paper ideas for professor ${email}:`, err);
    throw err;
  }
} 