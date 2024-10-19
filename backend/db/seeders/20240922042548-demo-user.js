'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'canalhouse@user.io',
        username: 'Demo-Dweller',
        firstName: 'Thomas',
        lastName: 'Everbrook',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'innshop@user.io',
        username: 'InnKeeper123',
        firstName: 'Marian',
        lastName: 'Stonefield',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'magetower@user.io',
        username: 'ArcaneMaster',
        firstName: 'Khadgar',
        lastName: 'Stormweaver',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-Dweller', 'InnKeeper123', 'ArcaneMaster'] }
    }, {});
  }
};
