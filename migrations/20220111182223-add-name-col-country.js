'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.describeTable("Countries").then(tableDefinition => {
      if (!tableDefinition['name']) {
        return queryInterface.addColumn(
          "Countries",
          "name",
          {
            type: Sequelize.STRING,
            allowNull: false,
          });
      } else {
        return Promise.resolve(true);
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.describeTable("Countries").then(tableDefinition => {
      if (tableDefinition['name']) {
        return queryInterface.removeColumn("Countries", "name");
      } else {
        return Promise.resolve(true);
      }
    });
  }
};
