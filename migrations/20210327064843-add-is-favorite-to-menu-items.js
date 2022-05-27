'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'MenuItems',
          'isFavorite',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
          },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('MenuItems', 'isFavorite'),
    ]);
  },
};
