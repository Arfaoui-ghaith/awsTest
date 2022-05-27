'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Material extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Material.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Material.belongsTo(models.Company, {
                foreignKey: 'CompanyId',
                onDelete: 'CASCADE'
            })
            Material.belongsTo(models.Unit, {
                foreignKey: 'UnitId',
                onDelete: 'CASCADE'
            })
            Material.hasMany(models.Stock, {
                foreignKey: 'MaterialId',
                onDelete: 'CASCADE'
            })
        }
    }
    Material.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        units: DataTypes.STRING,
        price: DataTypes.FLOAT,
        UnitId: DataTypes.UUID,
        CompanyId: DataTypes.UUID,
        priceDiffForEmailAlert: DataTypes.STRING,
        isDeletable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Material',
    });
    return Material;
};
