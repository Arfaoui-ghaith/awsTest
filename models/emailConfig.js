'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EmailConfig extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            EmailConfig.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
        }
    }
    EmailConfig.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        senderEmail: DataTypes.STRING,
        password: DataTypes.STRING,
        ccEmails: DataTypes.STRING,
        stockDifferencePurchase: DataTypes.BOOLEAN,
        billRefund: DataTypes.BOOLEAN,
        discountedBill: DataTypes.BOOLEAN,
        sessionClose: DataTypes.BOOLEAN,
        monthlyReport: DataTypes.BOOLEAN
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'EmailConfig',
    });
    return EmailConfig;
};
