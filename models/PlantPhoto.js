const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PlantPhoto extends Model {}

PlantPhoto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        plant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'houseplant',
                key: 'id',
            },
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'plantphoto',
    }
);

module.exports = PlantPhoto;