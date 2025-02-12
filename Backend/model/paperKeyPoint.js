import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import PaperEntry from './paperEntry.js';
import KeyPoint from './keyPoint.js';

const PaperKeyPoint = sequelize.define('PaperKeyPoint', {
  paperEntryId: {
    type: DataTypes.INTEGER,
    references: {
      model: PaperEntry,
      key: 'id',
    },
  },
  keyPointId: {
    type: DataTypes.INTEGER,
    references: {
      model: KeyPoint,
      key: 'id',
    },
  },
});

PaperEntry.belongsToMany(KeyPoint, { through: PaperKeyPoint });
KeyPoint.belongsToMany(PaperEntry, { through: PaperKeyPoint });

export default PaperKeyPoint;