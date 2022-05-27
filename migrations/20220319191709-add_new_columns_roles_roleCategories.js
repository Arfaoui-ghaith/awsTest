'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Roles',
        'accessPrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'updsteStock',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'editVariant',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'deleteVariant',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'viewPrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'addPrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'editPrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'Roles',
        'deletePrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      

      queryInterface.addColumn(
        'RoleCategories',
        'accessPrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'updsteStock',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editVariant',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deleteVariant',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'viewPrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'addPrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editPrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deletePrinter',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['accessPrinter']){
          return queryInterface.removeColumn("Roles", "accessPrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['updsteStock']){
          return queryInterface.removeColumn("Roles", "updsteStock");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['editVariant']){
          return queryInterface.removeColumn("Roles", "editVariant");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['deleteVariant']){
          return queryInterface.removeColumn("Roles", "deleteVariant");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['viewPrinter']){
          return queryInterface.removeColumn("Roles", "viewPrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['addPrinter']){
          return queryInterface.removeColumn("Roles", "addPrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['editPrinter']){
          return queryInterface.removeColumn("Roles", "editPrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['deletePrinter']){
          return queryInterface.removeColumn("Roles", "deletePrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    

    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['accessPrinter']){
          return queryInterface.removeColumn("RoleCategories", "accessPrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['updsteStock']){
          return queryInterface.removeColumn("RoleCategories", "updsteStock");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['editVariant']){
          return queryInterface.removeColumn("RoleCategories", "editVariant");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['deleteVariant']){
          return queryInterface.removeColumn("RoleCategories", "deleteVariant");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['viewPrinter']){
          return queryInterface.removeColumn("RoleCategories", "viewPrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['addPrinter']){
          return queryInterface.removeColumn("RoleCategories", "addPrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['editPrinter']){
          return queryInterface.removeColumn("RoleCategories", "editPrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['deletePrinter']){
          return queryInterface.removeColumn("RoleCategories", "deletePrinter");
      } else {
          return Promise.resolve(true);
      }
    }),
  ]);
  }
};
