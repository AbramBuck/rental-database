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
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182233/Stormwind_1_nw9out.jpg",
        spotId: 4,
        preview: true
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_6_fushzp.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_2_tradedistrict_o7h5mo.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184315/Lakeshire_4_eby2rj.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184310/Westfall_1_tjggly.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_6_fushzp.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_2_tradedistrict_o7h5mo.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184315/Lakeshire_4_eby2rj.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184310/Westfall_1_tjggly.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_6_fushzp.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_2_tradedistrict_o7h5mo.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184315/Lakeshire_4_eby2rj.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184310/Westfall_1_tjggly.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184309/Orgrimmar_1_drn8oo.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184309/Dalaran_1_tscvig.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184309/Darkshire_1_sn4tot.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729313250/Naxxramas_1_yiol2o.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729313392/SentinalHill_1_teoz3u.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184310/Amirdrassil_1_ukqnpw.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729313665/ZarelekCavern_1_mycbyu.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184310/EmeraldDream_1_eq7qvw.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184311/Hallowfall_1_d4yptt.jpg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184311/Khaz-Algar-Dorngal-City_1_ywzrrh.jpg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184311/Surramar_1_y0pdtt.jpg",
        preview: true
      },
      {
        spotId: 16,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184312/SilverMoon_4_b8osdu.jpg",
        preview: true
      },
      {
        spotId: 16,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184313/SilverMoon_5_nof3rk.jpg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184313/SilverMoon_1_kwfbq2.jpg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184311/SilverMoon_2_heg8dj.jpg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184312/SilverMoon_3_t7bphc.jpg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184312/Lakeshire_2_otnhyt.jpg",
        preview: true
      },
      {
        spotId: 17,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184314/Lakeshire_1_xynzkf.jpg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184315/Lakeshire_3_ssiwkm.jpg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184315/Lakeshire_4_eby2rj.jpg",
        preview: false
      },
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182233/Stormwind_1_nw9out.jpg://static.wikia.nocookie.net/wowpedia/images/e/eb/Stormwindcitypicture.jpg/revision/latest/scale-to-width-down/1920?cb=20180802124508", 
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184309/Orgrimmar_1_drn8oo.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182233/Stormwind_1_nw9out.jpg://static.wikia.nocookie.net/wowpedia/images/e/eb/Stormwindcitypicture.jpg/revision/latest/scale-to-width-down/1920?cb=20180802124508",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_6_fushzp.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729182232/Stormwind_2_tradedistrict_o7h5mo.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184315/Lakeshire_4_eby2rj.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184310/Westfall_1_tjggly.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184309/Orgrimmar_1_drn8oo.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184309/Dalaran_1_tscvig.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184309/Darkshire_1_sn4tot.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729313250/Naxxramas_1_yiol2o.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729313392/SentinalHill_1_teoz3u.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184310/Amirdrassil_1_ukqnpw.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729313665/ZarelekCavern_1_mycbyu.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184310/EmeraldDream_1_eq7qvw.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184311/Hallowfall_1_d4yptt.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184311/Khaz-Algar-Dorngal-City_1_ywzrrh.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184311/Surramar_1_y0pdtt.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184312/SilverMoon_4_b8osdu.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184313/SilverMoon_5_nof3rk.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184313/SilverMoon_1_kwfbq2.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184311/SilverMoon_2_heg8dj.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184312/SilverMoon_3_t7bphc.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184312/Lakeshire_2_otnhyt.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184314/Lakeshire_1_xynzkf.jpg",
          "https://res.cloudinary.com/di0fa12vz/image/upload/v1729184315/Lakeshire_3_ssiwkm.jpg"
        ]
      }
    }, {});
  }
};
