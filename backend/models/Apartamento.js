import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Apartamento = sequelize.define("Apartamento", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    propietarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Apartamento;
