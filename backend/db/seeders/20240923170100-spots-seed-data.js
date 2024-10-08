'use strict';

const { Spot, User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema is defined in options object
}

module.exports = {


  async up (queryInterface, Sequelize) {

    const users = await User.findOne({ where: {id:1}});

    await Spot.bulkCreate([
      {
        ownerId: users.id,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -333.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: users.id,
        address: "368 Mickey Lane",
        city: "Oakland",
        state: "California",
        country: "United States of America",
        lat: 27.7645358,
        lng: -222.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: users.id,
        address: "412 Peach Lane",
        city: "Nashville",
        state: "Tennessee",
        country: "United States of America",
        lat: 17.7645358,
        lng: -111.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Disney Lane', '368 Mickey Lane', '412 Peach Lane'] }
    }, {});
  }
};
