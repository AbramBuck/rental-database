'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema is defined in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182233/Stormwind_3_ynqn8u.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_4_uzmn9u.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_5_jd6me0.jpg",
        preview: true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182233/Stormwind_3_ynqn8u.jpg", 
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_4_uzmn9u.jpg", 
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_5_jd6me0.jpg"
        ]
      }
    }, {});
  }
};
