'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Roles',
        'addBranchAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'editBranchAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'deleteBranchAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'addCompanyAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'editCompanyAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'deleteCompanyAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'addSuperAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'editSuperAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'deleteSuperAdmin',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['addBranchAdmin']){
          return queryInterface.removeColumn("Roles", "addBranchAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['editBranchAdmin']){
          return queryInterface.removeColumn("Roles", "editBranchAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['deleteBranchAdmin']){
          return queryInterface.removeColumn("Roles", "deleteBranchAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['addCompanyAdmin']){
          return queryInterface.removeColumn("Roles", "addCompanyAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['editCompanyAdmin']){
          return queryInterface.removeColumn("Roles", "editCompanyAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['deleteCompanyAdmin']){
          return queryInterface.removeColumn("Roles", "deleteCompanyAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['addSuperAdmin']){
          return queryInterface.removeColumn("Roles", "addSuperAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['editSuperAdmin']){
          return queryInterface.removeColumn("Roles", "editSuperAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['deleteSuperAdmin']){
          return queryInterface.removeColumn("Roles", "deleteSuperAdmin");
      } else {
          return Promise.resolve(true);
      }
    }),
  ]);
  }
};

