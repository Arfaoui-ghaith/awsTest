'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        static associate(models) {
            // define association here
            Bill.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Bill.belongsTo(models.Session, {
                foreignKey: 'SessionId',
                onDelete: 'CASCADE'
            })
            Bill.belongsTo(models.Employee, {
                foreignKey: 'EmployeeId',
                onDelete: 'CASCADE'
            })
            Bill.belongsTo(models.Customer, {
                foreignKey: 'CustomerId',
                onDelete: 'CASCADE'
            })
        }
    }
    Bill.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        billNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        menuItems: DataTypes.JSONB,
        methodOfPayment: DataTypes.STRING,
        totalAmount: DataTypes.FLOAT,
        orderType: DataTypes.STRING,
        orderMetaData: DataTypes.JSONB,
        orderName: DataTypes.STRING,
        voided: DataTypes.BOOLEAN,
        notes: DataTypes.STRING,
        SessionId: DataTypes.UUID,
        ShopId: DataTypes.UUID,
        EmployeeId: DataTypes.UUID,
        CustomerId: DataTypes.UUID,
        onlineRefNumber: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Bill',
    });
    return Bill;
};
