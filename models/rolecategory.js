'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RoleCategory.hasMany(models.Role, {
        foreignKey: 'RoleCategoryId',
        onDelete: 'CASCADE'
      });

      RoleCategory.hasMany(models.Employee, {
        foreignKey: 'RoleCategoryId',
        onDelete: 'CASCADE'
      });
    }
  }
  RoleCategory.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: DataTypes.STRING,
    editCompany: DataTypes.BOOLEAN,
    viewCompany: DataTypes.BOOLEAN,
    addCompany: DataTypes.BOOLEAN,
    deleteCompany: DataTypes.BOOLEAN,
    
    editCountry: DataTypes.BOOLEAN,
    viewCountry: DataTypes.BOOLEAN,
    addCountry: DataTypes.BOOLEAN,
    deleteCountry: DataTypes.BOOLEAN,

    editUnit: DataTypes.BOOLEAN,
    viewUnit: DataTypes.BOOLEAN,
    addUnit: DataTypes.BOOLEAN,
    deleteUnit: DataTypes.BOOLEAN,

    editRoles: DataTypes.BOOLEAN, 
    viewRoles: DataTypes.BOOLEAN,
    addRoles: DataTypes.BOOLEAN,
    deleteRoles: DataTypes.BOOLEAN,

    addBranchAdmin: DataTypes.BOOLEAN,
    editBranchAdmin: DataTypes.BOOLEAN,
    deleteBranchAdmin: DataTypes.BOOLEAN,

    addCompanyAdmin: DataTypes.BOOLEAN,
    editCompanyAdmin: DataTypes.BOOLEAN,
    deleteCompanyAdmin: DataTypes.BOOLEAN,

    addSuperAdmin: DataTypes.BOOLEAN,
    editSuperAdmin: DataTypes.BOOLEAN,
    deleteSuperAdmin: DataTypes.BOOLEAN,

    editEmployee: DataTypes.BOOLEAN,
    viewUsers: DataTypes.BOOLEAN,
    addEmployee: DataTypes.BOOLEAN,
    deleteEmployee: DataTypes.BOOLEAN,

    viewStores: DataTypes.BOOLEAN, 
    addStores: DataTypes.BOOLEAN, 
    editStores: DataTypes.BOOLEAN, 
    deleteStores: DataTypes.BOOLEAN,

    viewShops: DataTypes.BOOLEAN, 
    addShops: DataTypes.BOOLEAN, 
    editShops: DataTypes.BOOLEAN, 
    deleteShops: DataTypes.BOOLEAN, 

    editMaterial: DataTypes.BOOLEAN,
    viewMaterial: DataTypes.BOOLEAN,
    addMaterial: DataTypes.BOOLEAN,
    deleteMaterial: DataTypes.BOOLEAN,

    editMenuItemCategory: DataTypes.BOOLEAN,
    viewMenuItemCategory: DataTypes.BOOLEAN,
    addMenuItemCategory: DataTypes.BOOLEAN,
    deleteMenuItemCategory: DataTypes.BOOLEAN,

    editMenuItem: DataTypes.BOOLEAN,
    viewMenuItem: DataTypes.BOOLEAN,
    addMenuItem: DataTypes.BOOLEAN,
    deleteMenuItem: DataTypes.BOOLEAN,
    addVariant: DataTypes.BOOLEAN,

    editPOSSettings: DataTypes.BOOLEAN,
    viewPOSSettings: DataTypes.BOOLEAN,

    addBill: DataTypes.BOOLEAN,
    deleteBill: DataTypes.BOOLEAN,
    viewBill: DataTypes.BOOLEAN,
    editBill: DataTypes.BOOLEAN,

    viewStock: DataTypes.BOOLEAN,
    adjustStock: DataTypes.BOOLEAN,
    moveStock: DataTypes.BOOLEAN,

    editExpenseCategory: DataTypes.BOOLEAN,
    viewExpenseCategory: DataTypes.BOOLEAN,
    addExpenseCategory: DataTypes.BOOLEAN,
    deleteExpenseCategory: DataTypes.BOOLEAN,

    editExpense: DataTypes.BOOLEAN,
    viewExpense: DataTypes.BOOLEAN,
    addExpense: DataTypes.BOOLEAN,
    deleteExpense: DataTypes.BOOLEAN,

    addTable: DataTypes.BOOLEAN,
    deleteTable: DataTypes.BOOLEAN,
    viewTable: DataTypes.BOOLEAN,
    editTable: DataTypes.BOOLEAN,

    viewReports: DataTypes.BOOLEAN,
    viewDashboard:DataTypes.BOOLEAN,
    editSession: DataTypes.BOOLEAN,

    accessSettings: DataTypes.BOOLEAN,
    accessBilling: DataTypes.BOOLEAN,
    accessPin: DataTypes.BOOLEAN,

    minimizePOS: DataTypes.BOOLEAN,

    accessPrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    updsteStock: {type: DataTypes.BOOLEAN, defaultValue: false},
    editVariant: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteVariant: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewPrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    addPrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    editPrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    deletePrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    
    isDeletable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
}, {
    sequelize,
    modelName: 'RoleCategory',
    tableName: 'RoleCategories'
});
return RoleCategory;
};