'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'Stocks',
          'units',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'StockLogs',
          'units',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      //queryInterface.removeColumn('Stocks', 'units'),
      //queryInterface.removeColumn('StockLogs', 'units'),
    ]);
  },
};
