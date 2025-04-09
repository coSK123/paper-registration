import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import PaperEntry from './paperEntry.js';
import KeyPoint from './keyPoints.js';


const PaperKeyPoint = sequelize.define('PaperKeyPoint', {

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

PaperEntry.belongsToMany(KeyPoint, {
  through: PaperKeyPoint,
  foreignKey: 'PaperEntryId'
});

KeyPoint.belongsToMany(PaperEntry, {
  through: PaperKeyPoint,
  foreignKey: 'KeyPointId'
});

export default PaperKeyPoint;