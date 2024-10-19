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
        email: 'anduin@azeroth.io',
        username: 'LightlessPaladin',
        firstName: 'Anduin',
        lastName: 'Wrynn',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'malfurion@azeroth.io',
        username: 'OwlBear',
        firstName: 'Malfurion',
        lastName: 'Stormrage',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'illidan@azeroth.io',
        username: 'YouAreNotPrepared',
        firstName: 'Illidan',
        lastName: 'Stormrage',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'sylvanas@azeroth.io',
        username: 'TheBanshee',
        firstName: 'Sylvanas',
        lastName: 'Windrunner',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'thrall@azeroth.io',
        username: 'ElementsUnbound',
        firstName: 'Thrall',
        lastName: 'Son of Durotan',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'jaina@azeroth.io',
        username: 'MageSupreme',
        firstName: 'Jaina',
        lastName: 'Proudmoore',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'tyrande@azeroth.io',
        username: 'MoonPrincess',
        firstName: 'Tyrande',
        lastName: 'Whisperwind',
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        email: 'genn@azeroth.io',
        username: 'WolfMan',
        firstName: 'Genn',
        lastName: 'Greymane',
        hashedPassword: bcrypt.hashSync('password11')
      },
      {
        email: 'voljin@azeroth.io',
        username: 'DaVoodoo',
        firstName: 'Voljin',
        lastName: 'Son of Sen’jin',
        hashedPassword: bcrypt.hashSync('password12')
      },
      {
        email: 'kaelthas@azeroth.io',
        username: 'PrinceOfFlames',
        firstName: 'Kaelthas',
        lastName: 'Sunstrider',
        hashedPassword: bcrypt.hashSync('password13')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['PrinceOfFlames', 'DaVoodoo', 'WolfMan', 'MoonPrincess', 'MageSupreme', 'ElementsUnbound', 'TheBanshee', 'YouAreNotPrepared', 'OwlBear', 'TheBoyKing'  ] }
    }, {});
  }
};
