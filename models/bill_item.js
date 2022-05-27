'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bill_Item.belongsTo(models.Shop, {
          foreignKey: 'shopId',
          onDelete: 'CASCADE'
      })
      Bill_Item.belongsTo(models.Session, {
          foreignKey: 'sessionId',
          onDelete: 'CASCADE'
      })
      Bill_Item.belongsTo(models.Printer, {
          foreignKey: 'printerId',
          onDelete: 'CASCADE'
      })
      Bill_Item.belongsTo(models.Company, {
          foreignKey: 'companyId',
          onDelete: 'CASCADE'
      })
    }
  }
  Bill_Item.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    bill_name: DataTypes.STRING,
    item_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    kitchen_info: DataTypes.TEXT,
    printerId: DataTypes.UUID,
    shopId: DataTypes.UUID,
    status: { type: DataTypes.ENUM, values: ['active','completed']},
    send_time: DataTypes.DATE,
    bill_no: DataTypes.STRING,
    sessionId: DataTypes.UUID,
    companyId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Bill_Item',
  });
  return Bill_Item;
};