'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'PosSetups',
        'billSeries',
        {type: Sequelize.TEXT},
      ),
      queryInterface.addColumn(
        'Bills',
        'onlineRefNumber',
        {type: Sequelize.TEXT},
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.describeTable("PosSetups").then(tableDefinition => {
        if (tableDefinition['billSeries']){
            return queryInterface.removeColumn("PosSetups", "billSeries");
        } else {
            return Promise.resolve(true);
        }
      }),
      queryInterface.describeTable("Bills").then(tableDefinition => {
        if (tableDefinition['onlineRefNumber']){
            return queryInterface.removeColumn("Bills", "onlineRefNumber");
        } else {
            return Promise.resolve(true);
        }
      }),
    ]);
  }
};
