'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'RoleCategories',
        'addBranchAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editBranchAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deleteBranchAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'addCompanyAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editCompanyAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deleteCompanyAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'addSuperAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editSuperAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deleteSuperAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['addBranchAdmin']){
          return queryInterface.removeColumn("RoleCategories", "addBranchAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['editBranchAdmin']){
          return queryInterface.removeColumn("RoleCategories", "editBranchAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['deleteBranchAdmin']){
          return queryInterface.removeColumn("RoleCategories", "deleteBranchAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['addCompanyAdmin']){
          return queryInterface.removeColumn("RoleCategories", "addCompanyAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['editCompanyAdmin']){
          return queryInterface.removeColumn("RoleCategories", "editCompanyAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['deleteCompanyAdmin']){
          return queryInterface.removeColumn("RoleCategories", "deleteCompanyAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['addSuperAdmin']){
          return queryInterface.removeColumn("RoleCategories", "addSuperAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['editSuperAdmin']){
          return queryInterface.removeColumn("RoleCategories", "editSuperAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['deleteSuperAdmin']){
          return queryInterface.removeColumn("RoleCategories", "deleteSuperAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
  ]);
  }
};

