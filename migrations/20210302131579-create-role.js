'use strict';
const getColumns = (Sequelize) => {
  const columns = [
    'editEmployee','viewEmployee', 'editMaterial','viewMaterial',
    'editMenuItem','viewMenuItem', 'editPOSSettings','viewPOSSettings',
    'viewReports', 'editSession', 'addBill','deleteBill',
    'accessSettings', 'minimizePOS', 'editInventory','viewInventory',
    'editExpense','viewExpense']

  const obj = {}

  columns.forEach((item) => {
    obj[item] = {
      allowNull: false,
      type: {type: Sequelize.BOOLEAN, defaultValue: true},
      default: false
    }
  })

  return obj;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      
      name: Sequelize.STRING,
          
      viewCompany: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      editRoles: {type: Sequelize.BOOLEAN, defaultValue: true}, 
      viewRoles: {type: Sequelize.BOOLEAN, defaultValue: true},
      addRoles: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteRoles: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      editEmployee: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewEmployee: {type: Sequelize.BOOLEAN, defaultValue: true},
      addEmployee: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteEmployee: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      editMaterial: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewMaterial: {type: Sequelize.BOOLEAN, defaultValue: true},
      addMaterial: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteMaterial: {type: Sequelize.BOOLEAN, defaultValue: true},

      editMenuItemCategory: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewMenuItemCategory: {type: Sequelize.BOOLEAN, defaultValue: true},
      addMenuItemCategory: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteMenuItemCategory: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      editMenuItem: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewMenuItem: {type: Sequelize.BOOLEAN, defaultValue: true},
      addMenuItem: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteMenuItem: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      editPOSSettings: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewPOSSettings: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      addBill: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteBill: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewBill: {type: Sequelize.BOOLEAN, defaultValue: true},
      editBill: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      editInventory: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewInventory: {type: Sequelize.BOOLEAN, defaultValue: true},
      addInventory: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteInventory: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      viewStock: {type: Sequelize.BOOLEAN, defaultValue: true},
      adjustStock: {type: Sequelize.BOOLEAN, defaultValue: true},
      moveStock: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      editExpenseCategory: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewExpenseCategory: {type: Sequelize.BOOLEAN, defaultValue: true},
      addExpenseCategory: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteExpenseCategory: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      editExpense: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewExpense: {type: Sequelize.BOOLEAN, defaultValue: true},
      addExpense: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteExpense: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      addTable: {type: Sequelize.BOOLEAN, defaultValue: true},
      deleteTable: {type: Sequelize.BOOLEAN, defaultValue: true},
      viewTable: {type: Sequelize.BOOLEAN, defaultValue: true},
      editTable: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      viewReports: {type: Sequelize.BOOLEAN, defaultValue: true},
      editSession: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      accessSettings: {type: Sequelize.BOOLEAN, defaultValue: true},
      accessBilling: {type: Sequelize.BOOLEAN, defaultValue: true},
      accessPin: {type: Sequelize.BOOLEAN, defaultValue: true},
  
      minimizePOS: {type: Sequelize.BOOLEAN, defaultValue: true},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isDeletable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      ShopId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Shops',
          key: 'id'
        }
      },
      RoleCategoryId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'RoleCategories',
          key: 'id'
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  }
};
