'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.addColumn(
      'Roles',
      'AddCompany',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
      },
    ),
    queryInterface.addColumn(
      'Roles',
      'EditCompany',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
      },
    ),
    queryInterface.addColumn(
      'Roles',
      'ViewCompany',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
      },
    ),
    queryInterface.addColumn(
      'Roles',
      'DeleteCompany',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
      },
    )]);
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
