import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const KeyPoint = sequelize.define('KeyPoint', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default KeyPoint;