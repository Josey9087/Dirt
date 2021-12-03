const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Houseplant extends Model {}

Houseplant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            references: {
            model: 'post',
            key: 'id',
             },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        water: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sunlight: {
            type: DataTypes.INTEGER,

        },
        scientific_name: {
            type: DataTypes.STRING,
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