'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'BillTemplates',
        'billNumber',
        {
          allowNull: true,
          type: Sequelize.TEXT
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
