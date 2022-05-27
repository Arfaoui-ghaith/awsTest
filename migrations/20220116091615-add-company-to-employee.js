'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'Employees',
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
    return queryInterface.describeTable("Employees").then(tableDefinition => {
      if (tableDefinition['CompanyId']){
          return queryInterface.removeColumn("Employees", "CompanyId");
      } else {
          return Promise.resolve(true);
      }
    });
  }
};
