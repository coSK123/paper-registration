import { sequelize } from '../database.js';

export const getPaperIdeas = async (filters) => {
  const { titleSearch, groupSize, keyPointIds, semesterId, activeSemesterOnly } = filters;
  
  let query = `
    SELECT 
      pi.id,
      pi.title,
      pi.description,
      pi.group_size,
      pi.created_at,
      pi.updated_at,
      pi.semester_id,
      s.name as semester_name,
      s.is_active as semester_is_active,
      p.id as professor_id,
      p.name as professor_name,
      p.email as professor_email,
      p.department as professor_department,
      p.office as professor_office,
      p.phone as professor_phone,
      p.website as professor_website,
      p.bio as professor_bio,
      p.photo_url as professor_photo_url,
      p.created_at as professor_created_at,
      p.updated_at as professor_updated_at
    FROM paper_ideas pi
    LEFT JOIN semesters s ON pi.semester_id = s.id
    LEFT JOIN professors p ON pi.professor_id = p.id
    WHERE 1=1
  `;
  
  const replacements = {};
  
  if (titleSearch) {
    query += ` AND (pi.title LIKE :titleSearch OR pi.description LIKE :titleSearch)`;
    replacements.titleSearch = `%${titleSearch}%`;
  }
  
  if (groupSize) {
    query += ` AND pi.group_size = :groupSize`;
    replacements.groupSize = groupSize;
  }
  
  if (semesterId) {
    query += ` AND pi.semester_id = :semesterId`;
    replacements.semesterId = semesterId;
  }
  
  if (activeSemesterOnly) {
    query += ` AND s.is_active = true`;
  }
  
  if (keyPointIds && keyPointIds.length > 0) {
    query += ` AND pi.id IN (
      SELECT paper_idea_id 
      FROM paper_idea_keypoints 
      WHERE keypoint_id IN (:keyPointIds)
    )`;
    replacements.keyPointIds = keyPointIds;
  }
  
  query += ` ORDER BY pi.created_at DESC`;
  
  const [paperIdeas] = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT
  });
  
  // Fetch keypoints for each paper idea
  for (let paperIdea of paperIdeas) {
    const [keypoints] = await sequelize.query(
      `SELECT k.* FROM keypoints k
       JOIN paper_idea_keypoints pik ON k.id = pik.keypoint_id
       WHERE pik.paper_idea_id = :paperIdeaId
       ORDER BY k.name`,
      {
        replacements: { paperIdeaId: paperIdea.id },
        type: sequelize.QueryTypes.SELECT
      }
    );
    paperIdea.keypoints = keypoints;
  }
  
  return paperIdeas;
}; 