'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'Shops',
          'CompanyId',
          {
            type: Sequelize.UUID,
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
              model: 'Companies',
              key: 'id'
            }
          },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.describeTable("Shops").then(tableDefinition => {
      if (tableDefinition['CompanyId']){
          return queryInterface.removeColumn("Shops", "CompanyId");
      } else {
          return Promise.resolve(true);
      }
    });
  }
};