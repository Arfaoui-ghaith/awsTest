'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        static associate(models) {
            // define association here
            Company.hasMany(models.Shop, {
                foreignKey: 'CompanyId',
                onDelete: 'CASCADE'
            })
            Company.hasMany(models.Employee, {
                foreignKey: 'CompanyId',
                onDelete: 'CASCADE'
            })
            Company.belongsTo(models.Country, {
                foreignKey: 'CountryId',
                onDelete: 'CASCADE'
            })
            Company.hasMany(models.Bill_Item, {
                foreignKey: 'companyId',
                onDelete: 'CASCADE'
            })
        }
    }
    Company.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
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
        CountryId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        maxShops: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        maxEmployees: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    }, {
        sequelize,
        modelName: 'Company',
    });

    
    return Company;
};
