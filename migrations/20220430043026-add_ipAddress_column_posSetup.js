'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'PosSetups',
        'ipAddress',
        {type: Sequelize.STRING},
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.describeTable("PosSetups").then(tableDefinition => {
        if (tableDefinition['ipAddress']){
            return queryInterface.removeColumn("PosSetups", "ipAddress");
        } else {
            return Promise.resolve(true);
        }
      })
    ]);
  }
};
