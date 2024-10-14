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
        spotId: 4,
        url: "https://static.wikia.nocookie.net/wowpedia/images/e/eb/Stormwindcitypicture.jpg/revision/latest/scale-to-width-down/1920?cb=20180802124508"
      },
      {
        spotId: 5,
        url: "https://static.wikia.nocookie.net/wowpedia/images/4/48/Orgrimmar_070910_000058_-_Kirkburn_12319.jpg/revision/latest/scale-to-width-down/1000?cb=20100710172653"
      },
      {
        spotId: 6,
        url: "https://static.wikia.nocookie.net/wowpedia/images/4/40/Dalaran_Northrend.jpg/revision/latest/scale-to-width-down/1000?cb=20080808132932"
      },
      {
        spotId: 7,
        url: "https://static.wikia.nocookie.net/wowpedia/images/b/b9/Darkshire.jpg/revision/latest/scale-to-width-down/1000?cb=20230526233102"
      },
      {
        spotId: 8,
        url: "https://static.wikia.nocookie.net/wowpedia/images/d/d3/Naxxramas.jpg/revision/latest/scale-to-width-down/1000?cb=20100719013321"
      },
      {
        spotId: 9,
        url: "https://static.wikia.nocookie.net/wowpedia/images/e/eb/Moonbrook_2.jpg/revision/latest/scale-to-width-down/1000?cb=20230606140216"
      },
      {
        spotId: 10,
        url: "https://pbs.twimg.com/media/F9ctPrqWMAAnA5l.jpg:large"
      },
      {
        spotId: 11,
        url: "https://wow.zamimg.com/uploads/screenshots/normal/1105901.jpg"
      },
      {
        spotId: 12,
        url: "https://bnetcmsus-a.akamaihd.net/cms/blog_thumbnail/qd/QDGILH0V2KLF1703268521138.png"
      },
      {
        spotId: 13,
        url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/08/world-of-warcraft-hallowfall-arathi-renown-guide-1.jpg?q=70&fit=crop&w=1140&h=&dpr=1"
      },
      {
        spotId: 14,
        url: "https://www.warcrafttavern.com/wp-content/uploads/2024/08/Khaz-Algar-Dornogal-City.jpg"
      },
      {
        spotId: 15,
        url: "https://i.ytimg.com/vi/cGLHRKNyx6c/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGD0gOyh_MA8=&rs=AOn4CLDjiGks6WCAE_k4nH_VAj4T0CiovQ"
      },
      {
        spotId: 16,
        url: "https://static.wikia.nocookie.net/wowpedia/images/d/d4/TheBazaar1.jpg/revision/latest/scale-to-width-down/640?cb=20061129154332"
      },
      {
        spotId: 17,
        url: "https://static.wikia.nocookie.net/wowpedia/images/4/43/Lakeshire_Inn.jpg/revision/latest/scale-to-width-down/1200?cb=20200914124925"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          "https://static.wikia.nocookie.net/wowpedia/images/e/eb/Stormwindcitypicture.jpg/revision/latest/scale-to-width-down/1920?cb=20180802124508", 
          "https://static.wikia.nocookie.net/wowpedia/images/4/48/Orgrimmar_070910_000058_-_Kirkburn_12319.jpg/revision/latest/scale-to-width-down/1000?cb=20100710172653", 
          "https://static.wikia.nocookie.net/wowpedia/images/4/40/Dalaran_Northrend.jpg/revision/latest/scale-to-width-down/1000?cb=20080808132932",
          "https://static.wikia.nocookie.net/wowpedia/images/b/b9/Darkshire.jpg/revision/latest/scale-to-width-down/1000?cb=20230526233102",
          "https://static.wikia.nocookie.net/wowpedia/images/d/d3/Naxxramas.jpg/revision/latest/scale-to-width-down/1000?cb=20100719013321",
          "https://static.wikia.nocookie.net/wowpedia/images/e/eb/Moonbrook_2.jpg/revision/latest/scale-to-width-down/1000?cb=20230606140216",
          "https://pbs.twimg.com/media/F9ctPrqWMAAnA5l.jpg:large",
          "https://wow.zamimg.com/uploads/screenshots/normal/1105901.jpg",
          "https://bnetcmsus-a.akamaihd.net/cms/blog_thumbnail/qd/QDGILH0V2KLF1703268521138.png",
          "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/08/world-of-warcraft-hallowfall-arathi-renown-guide-1.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
          "https://www.warcrafttavern.com/wp-content/uploads/2024/08/Khaz-Algar-Dornogal-City.jpg",
          "https://i.ytimg.com/vi/cGLHRKNyx6c/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGD0gOyh_MA8=&rs=AOn4CLDjiGks6WCAE_k4nH_VAj4T0CiovQ",
          "https://static.wikia.nocookie.net/wowpedia/images/d/d4/TheBazaar1.jpg/revision/latest/scale-to-width-down/640?cb=20061129154332",
          "https://static.wikia.nocookie.net/wowpedia/images/4/43/Lakeshire_Inn.jpg/revision/latest/scale-to-width-down/1200?cb=20200914124925"
        ]
      }
    }, {});
  }
};
