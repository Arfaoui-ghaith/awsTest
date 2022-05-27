'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Role.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })

            Role.belongsTo(models.RoleCategory, {
                foreignKey: 'RoleCategoryId',
                onDelete: 'CASCADE'
            })
        }
    }
    Role.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },

    RoleCategoryId: DataTypes.UUID,
      
    name: DataTypes.STRING,
        
    viewCompany: {type: DataTypes.BOOLEAN, defaultValue: false},

    editRoles: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    viewRoles: {type: DataTypes.BOOLEAN, defaultValue: false},
    addRoles: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteRoles: {type: DataTypes.BOOLEAN, defaultValue: false},

    addBranchAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
    editBranchAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteBranchAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},

    addCompanyAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
    editCompanyAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteCompanyAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},

    addSuperAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
    editSuperAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteSuperAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},

    editEmployee: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewUsers: {type: DataTypes.BOOLEAN, defaultValue: false},
    addEmployee: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteEmployee: {type: DataTypes.BOOLEAN, defaultValue: false},

    viewStores: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    addStores: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    editStores: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    deleteStores: {type: DataTypes.BOOLEAN, defaultValue: false},

    viewShops: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    addShops: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    editShops: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    deleteShops: {type: DataTypes.BOOLEAN, defaultValue: false}, 

    editMaterial: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewMaterial: {type: DataTypes.BOOLEAN, defaultValue: false},
    addMaterial: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteMaterial: {type: DataTypes.BOOLEAN, defaultValue: false},

    editMenuItemCategory: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewMenuItemCategory: {type: DataTypes.BOOLEAN, defaultValue: false},
    addMenuItemCategory: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteMenuItemCategory: {type: DataTypes.BOOLEAN, defaultValue: false},

    editMenuItem: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewMenuItem: {type: DataTypes.BOOLEAN, defaultValue: false},
    addMenuItem: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteMenuItem: {type: DataTypes.BOOLEAN, defaultValue: false},
    addVariant: {type: DataTypes.BOOLEAN, defaultValue: false},

    editPOSSettings: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewPOSSettings: {type: DataTypes.BOOLEAN, defaultValue: false},

    addBill: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteBill: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewBill: {type: DataTypes.BOOLEAN, defaultValue: false},
    editBill: {type: DataTypes.BOOLEAN, defaultValue: false},

    viewStock: {type: DataTypes.BOOLEAN, defaultValue: false},
    adjustStock: {type: DataTypes.BOOLEAN, defaultValue: false},
    moveStock: {type: DataTypes.BOOLEAN, defaultValue: false},

    editExpenseCategory: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewExpenseCategory: {type: DataTypes.BOOLEAN, defaultValue: false},
    addExpenseCategory: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteExpenseCategory: {type: DataTypes.BOOLEAN, defaultValue: false},

    editExpense: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewExpense: {type: DataTypes.BOOLEAN, defaultValue: false},
    addExpense: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteExpense: {type: DataTypes.BOOLEAN, defaultValue: false},

    addTable: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteTable: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewTable: {type: DataTypes.BOOLEAN, defaultValue: false},
    editTable: {type: DataTypes.BOOLEAN, defaultValue: false},

    viewReports: {type: DataTypes.BOOLEAN, defaultValue: false},
    editSession: {type: DataTypes.BOOLEAN, defaultValue: false},

    accessSettings: {type: DataTypes.BOOLEAN, defaultValue: false},
    accessBilling: {type: DataTypes.BOOLEAN, defaultValue: false},
    accessPin: {type: DataTypes.BOOLEAN, defaultValue: false},

    minimizePOS: {type: DataTypes.BOOLEAN, defaultValue: false},

    accessPrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    updsteStock: {type: DataTypes.BOOLEAN, defaultValue: false},
    editVariant: {type: DataTypes.BOOLEAN, defaultValue: false},
    deleteVariant: {type: DataTypes.BOOLEAN, defaultValue: false},
    viewPrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    addPrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    editPrinter: {type: DataTypes.BOOLEAN, defaultValue: false},
    deletePrinter: {type: DataTypes.BOOLEAN, defaultValue: false},

    viewUnit: {type: DataTypes.BOOLEAN, defaultValue: false},
    
    isDeletable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
};
