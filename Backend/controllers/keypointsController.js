import { getAllKeyPoints as fetchAllKeyPoints } from '../database/keyPointUtils.js';

export const getAllKeyPoints = async (req, res) => {
  try {
    const keyPoints = await fetchAllKeyPoints();
    return res.status(200).json(keyPoints);
  } catch (err) {
    console.error('Error fetching key points:', err);
    return res.status(500).json({ message: 'Failed to fetch key points', error: err.message });
  }
}; 