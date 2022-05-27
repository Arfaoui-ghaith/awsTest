'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      /*queryInterface.removeColumn(
        'Stores',
        'ShopId'
      ), 
      queryInterface.removeColumn(
        'Stores',
        'PosSetups'
      ),*/
      queryInterface.addColumn(
        'Stores',
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
      )]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
