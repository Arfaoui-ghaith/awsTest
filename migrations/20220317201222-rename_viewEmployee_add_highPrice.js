'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'StockLogs',
        'highPrice',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      ),
      queryInterface.addColumn('RoleCategories', 'viewUsers', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }),
      queryInterface.addColumn('Roles', 'viewUsers', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }),
      queryInterface.removeColumn('RoleCategories', 'viewEmployee'),
      queryInterface.removeColumn('Roles', 'viewEmployee')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.describeTable("StockLogs").then(tableDefinition => {
      if (tableDefinition['highPrice']){
          return queryInterface.removeColumn("StockLogs", "highPrice");
      } else {
          return Promise.resolve(true);
      }
    }),
    queryInterface.describeTable("RoleCategories").then(tableDefinition => {
      if (tableDefinition['viewUsers']){
          return queryInterface.removeColumn("RoleCategories", "viewUsers");
      } else {
          return queryInterface.addColumn('Roles', 'viewEmployee', {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          });
      }
    }),
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['viewUsers']){
          return queryInterface.removeColumn("Roles", "viewUsers");
      } else {
          return queryInterface.addColumn('Roles', 'viewEmployee', {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          });
      }
    })
  ]);
  }
};


