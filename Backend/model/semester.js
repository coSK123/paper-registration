import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";


const Semester = sequelize.define('Semester', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default Semester;