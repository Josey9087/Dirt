const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Houseplant extends Model {}

Houseplant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        water: {
            type: DataTypes.INTEGER,
        },
        sunlight: {
            type: DataTypes.INTEGER,

        },
        scientific_name: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,   
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'houseplant',
    }
);

module.exports = Houseplant;