'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Roles',
        'viewUnit',
        {type: Sequelize.BOOLEAN, defaultValue: false},
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.describeTable("Roles").then(tableDefinition => {
      if (tableDefinition['viewUnit']){
          return queryInterface.removeColumn("Roles", "viewUnit");
      } else {
          return Promise.resolve(true);
      }
    }),
  ]);
  }
};

