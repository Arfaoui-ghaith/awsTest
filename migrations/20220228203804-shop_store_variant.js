'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.addColumn(
        'Roles',
        'viewStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'addStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'editStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'deleteStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        } 
      ), queryInterface.addColumn(
        'Roles',
        'viewShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'addShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'editShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'deleteShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        }),queryInterface.addColumn(
          'Roles',
          'addVariant',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            default: false
          }
      ),queryInterface.addColumn(
        'RoleCategories',
        'viewStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'addStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deleteStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        } 
      ), queryInterface.addColumn(
        'RoleCategories',
        'viewShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'addShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deleteShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        }),queryInterface.addColumn(
          'RoleCategories',
          'addVariant',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            default: false
          }
      )]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['viewStores']){
            return queryInterface.removeColumn("Roles", "viewStores");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['addStores']){
            return queryInterface.removeColumn("Roles", "addStores");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['editStores']){
            return queryInterface.removeColumn("Roles", "editStores");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['deleteStores']){
            return queryInterface.removeColumn("Roles", "deleteStores");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['viewShops']){
            return queryInterface.removeColumn("Roles", "viewShops");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['addShops']){
            return queryInterface.removeColumn("Roles", "addShops");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['editShops']){
            return queryInterface.removeColumn("Roles", "editShops");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['deleteShops']){
            return queryInterface.removeColumn("Roles", "deleteShops");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Roles").then(tableDefinition => {
        if (tableDefinition['addVariant']){
            return queryInterface.removeColumn("Roles", "addVariant");
        } else {
            return Promise.resolve(true);
        }
      }),
      
      
  
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['viewStores']){
            return queryInterface.removeColumn("RoleCategories", "viewStores");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['addStores']){
            return queryInterface.removeColumn("RoleCategories", "addStores");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['editStores']){
            return queryInterface.removeColumn("RoleCategories", "editStores");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['deleteStores']){
            return queryInterface.removeColumn("RoleCategories", "deleteStores");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['viewShops']){
            return queryInterface.removeColumn("RoleCategories", "viewShops");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['addShops']){
            return queryInterface.removeColumn("RoleCategories", "addShops");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['editShops']){
            return queryInterface.removeColumn("RoleCategories", "editShops");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['deleteShops']){
            return queryInterface.removeColumn("RoleCategories", "deleteShops");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("RoleCategories").then(tableDefinition => {
        if (tableDefinition['addVariant']){
            return queryInterface.removeColumn("RoleCategories", "addVariant");
        } else {
            return Promise.resolve(true);
        }
      }),
    ]);
    
  }
};
