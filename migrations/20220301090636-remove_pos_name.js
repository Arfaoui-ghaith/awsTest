'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'PosSetups',
        'name',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      )]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.describeTable("PosSetups").then(tableDefinition => {
      if (tableDefinition['name']){
          return queryInterface.removeColumn("PosSetups", "name");
      } else {
          return Promise.resolve(true);
      }
    });
  }
};
