import { sequelize } from "../database";
import { DataTypes } from "sequelize";


const Semster = sequelize.define('Semester', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default Semster;