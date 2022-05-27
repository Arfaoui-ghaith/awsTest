'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BillTemplate extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BillTemplate.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
        }
    }
    BillTemplate.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        logo: DataTypes.TEXT,
        header: DataTypes.TEXT,
        footer: DataTypes.TEXT,
        billNumber: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'BillTemplate',
    });
    return BillTemplate;
};
