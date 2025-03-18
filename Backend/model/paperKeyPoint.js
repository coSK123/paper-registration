import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import PaperEntry from './paperEntry.js';
import KeyPoint from './keyPoints.js';

// Define the join table with explicit column names matching Sequelize's convention
const PaperKeyPoint = sequelize.define('PaperKeyPoint', {
  // Define the columns with exact names matching Sequelize's convention
  PaperEntryId: {
    type: DataTypes.INTEGER,
    references: {
      model: PaperEntry,
      key: 'id',
    }
  },
  KeyPointId: {
    type: DataTypes.INTEGER,
    references: {
      model: KeyPoint,
      key: 'id',
    }
  }
});

// Define the associations with explicit foreign keys
PaperEntry.belongsToMany(KeyPoint, {
  through: PaperKeyPoint,
  foreignKey: 'PaperEntryId'
});

KeyPoint.belongsToMany(PaperEntry, {
  through: PaperKeyPoint,
  foreignKey: 'KeyPointId'
});

export default PaperKeyPoint;