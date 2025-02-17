import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import Semester from './semester.js';	

const PaperEntry = sequelize.define('PaperEntry', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creator: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupSize: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  semesterId: {
    type: DataTypes.INTEGER,
    references: {
      model: Semester,
      key: 'id',
    },
    allowNull: false,
  },
});

export default PaperEntry;