'use strict';

const { Spot, User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema is defined in options object
}

module.exports = {


  async up (queryInterface, Sequelize) {

    const users = await User.findAll({ where: {id: [1, 2, 3]}});
    if (users.length < 3) {
      throw new Error('Not all users exist in the User table');
    }

    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "12 Canal Side House",
        city: "Stormwind",
        state: "Elwynn Forest",
        country: "Azeroth",
        lat: 49.842527,
        lng: -73.674823,
        name: "Canal-side House",
        description: "A quaint little house by the canals of Stormwind. Perfect for a quiet evening.",
        price: 550
      },
      {
        ownerId: 2,
        address: "23 Trade District Shop",
        city: "Stormwind",
        state: "Elwynn Forest",
        country: "Azeroth",
        lat: 49.847123,
        lng: -73.678456,
        name: "Lion's Pride Inn & Shop",
        description: "A cozy shop that doubles as an inn in the bustling Trade District.",
        price: 200
      },
      {
        ownerId: 3,
        address: "1 Mage Tower Circle",
        city: "Stormwind",
        state: "Elwynn Forest",
        country: "Azeroth",
        lat: 49.849851,
        lng: -73.675912,
        name: "Mage Tower",
        description: "A towering structure, home to powerful mages and arcane studies.",
        price: 3000
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['12 Canal Side House', '23 Trade District Shop', '1 Mage Tower Circle'] }
    }, {});
  }
};
