'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Printer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Printer.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            });
            Printer.hasMany(models.MenuItem, {
                foreignKey: 'PrinterId',
                onDelete: 'CASCADE'
            });
            Printer.hasMany(models.Bill_Item, {
                foreignKey: 'printerId',
                onDelete: 'CASCADE'
            })
        }
    }
    Printer.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        ipAddress: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isDeletable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }, {
        sequelize,
        modelName: 'Printer',
    });
    return Printer;
};
