'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'name', {
      allowNull: false,
      type: Sequelize.STRING
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'name');
  }
};
