'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'Companies',
          'CountryId',
          {
            type: Sequelize.UUID,
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
              model: 'Countries',
              key: 'id'
            }
          },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.describeTable("Companies").then(tableDefinition => {
      if (tableDefinition['CountryId']){
          return queryInterface.removeColumn("Companies", "CountryId");
      } else {
          return Promise.resolve(true);
      }
    });
  }
};