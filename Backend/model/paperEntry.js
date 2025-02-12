import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

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
  semester: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default PaperEntry;