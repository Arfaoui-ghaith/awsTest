'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoleCategories', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: Sequelize.STRING,
      editCompany: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewCompany: {type: Sequelize.BOOLEAN, defaultValue: false},
      addCompany: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteCompany: {type: Sequelize.BOOLEAN, defaultValue: false},
      
      editCountry: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewCountry: {type: Sequelize.BOOLEAN, defaultValue: false},
      addCountry: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteCountry: {type: Sequelize.BOOLEAN, defaultValue: false},

      editUnit: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewUnit: {type: Sequelize.BOOLEAN, defaultValue: false},
      addUnit: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteUnit: {type: Sequelize.BOOLEAN, defaultValue: false},

      editRoles: {type: Sequelize.BOOLEAN, defaultValue: false}, 
      viewRoles: {type: Sequelize.BOOLEAN, defaultValue: false},
      addRoles: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteRoles: {type: Sequelize.BOOLEAN, defaultValue: false},

      editEmployee: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewEmployee: {type: Sequelize.BOOLEAN, defaultValue: false},
      addEmployee: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteEmployee: {type: Sequelize.BOOLEAN, defaultValue: false},

      editMaterial: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewMaterial: {type: Sequelize.BOOLEAN, defaultValue: false},
      addMaterial: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteMaterial: {type: Sequelize.BOOLEAN, defaultValue: false},

      editMenuItemCategory: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewMenuItemCategory: {type: Sequelize.BOOLEAN, defaultValue: false},
      addMenuItemCategory: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteMenuItemCategory: {type: Sequelize.BOOLEAN, defaultValue: false},

      editMenuItem: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewMenuItem: {type: Sequelize.BOOLEAN, defaultValue: false},
      addMenuItem: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteMenuItem: {type: Sequelize.BOOLEAN, defaultValue: false},

      editPOSSettings: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewPOSSettings: {type: Sequelize.BOOLEAN, defaultValue: false},

      addBill: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteBill: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewBill: {type: Sequelize.BOOLEAN, defaultValue: false},
      editBill: {type: Sequelize.BOOLEAN, defaultValue: false},

      editInventory: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewInventory: {type: Sequelize.BOOLEAN, defaultValue: false},
      addInventory: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteInventory: {type: Sequelize.BOOLEAN, defaultValue: false},

      viewStock: {type: Sequelize.BOOLEAN, defaultValue: false},
      adjustStock: {type: Sequelize.BOOLEAN, defaultValue: false},
      moveStock: {type: Sequelize.BOOLEAN, defaultValue: false},

      editExpenseCategory: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewExpenseCategory: {type: Sequelize.BOOLEAN, defaultValue: false},
      addExpenseCategory: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteExpenseCategory: {type: Sequelize.BOOLEAN, defaultValue: false},

      editExpense: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewExpense: {type: Sequelize.BOOLEAN, defaultValue: false},
      addExpense: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteExpense: {type: Sequelize.BOOLEAN, defaultValue: false},

      addTable: {type: Sequelize.BOOLEAN, defaultValue: false},
      deleteTable: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewTable: {type: Sequelize.BOOLEAN, defaultValue: false},
      editTable: {type: Sequelize.BOOLEAN, defaultValue: false},

      viewReports: {type: Sequelize.BOOLEAN, defaultValue: false},
      viewDashboard:{type: Sequelize.BOOLEAN, defaultValue: false},
      editSession: {type: Sequelize.BOOLEAN, defaultValue: false},

      accessSettings: {type: Sequelize.BOOLEAN, defaultValue: false},
      accessBilling: {type: Sequelize.BOOLEAN, defaultValue: false},
      accessPin: {type: Sequelize.BOOLEAN, defaultValue: false},

      minimizePOS: {type: Sequelize.BOOLEAN, defaultValue: false},
      
      isDeletable: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RoleCategories');
  }
};