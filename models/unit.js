'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Unit extends Model {
        static associate(models) {
            // define association here
            Unit.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })

            Unit.hasMany(models.Material, {
                foreignKey: 'UnitId',
                onDelete: 'CASCADE'
            })
        }
    }
    Unit.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        shortForm: DataTypes.TEXT,
        isDeletable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Unit',
    });
    return Unit;
};
