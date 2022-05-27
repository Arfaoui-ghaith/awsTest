'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Country extends Model {
        static associate(models) {
            // define association here
            Country.hasMany(models.Shop, {
                foreignKey: 'CountryId',
                onDelete: 'CASCADE'
            });

            Country.hasMany(models.Company, {
                foreignKey: 'CountryId',
                onDelete: 'CASCADE'
            })
        }
    }
    Country.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        currency: DataTypes.STRING,
        currencySymbol: DataTypes.STRING,
        description: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isDeletable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Country',
    });
    return Country;
};
