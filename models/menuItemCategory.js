'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MenuItemCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MenuItemCategory.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })

            MenuItemCategory.hasMany(models.MenuItem, {
                as: 'menuItems',
                foreignKey: 'MenuItemCategoryId',
                onDelete: 'CASCADE'
            })
        }
    }
    MenuItemCategory.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        arabicName: DataTypes.STRING,
        arabicDescription: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isDeletable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isFavorite: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'MenuItemCategory',
    });
    return MenuItemCategory;
};
