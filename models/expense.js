'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Expense extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Expense.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Expense.belongsTo(models.ExpenseCategory, {
                foreignKey: 'ExpenseCategoryId',
                onDelete: 'CASCADE'
            })
        }
    }
    Expense.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        date: DataTypes.DATE,
        ExpenseCategoryId: DataTypes.UUID,
        cost: DataTypes.FLOAT,
        description: DataTypes.TEXT,
        isDeletable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Expense',
    });
    return Expense;
};
