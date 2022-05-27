'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'Shops',
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
    return queryInterface.describeTable("Shops").then(tableDefinition => {
      if (tableDefinition['CountryId']){
          return queryInterface.removeColumn("Shops", "CountryId");
      } else {
          return Promise.resolve(true);
      }
    });
  }
};
