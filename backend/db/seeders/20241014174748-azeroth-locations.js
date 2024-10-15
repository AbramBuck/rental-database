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
        ownerId: 4,
        address: "100 Stormwind Keep Rd",
        city: "Stormwind",
        state: "Eastern Kingdoms",
        country: "Azeroth",
        lat: 38.8977,
        lng: -77.0365,
        name: "Stormwind Castle",
        description: "An iconic fortress in the heart of Stormwind, the capital of the Alliance. Guests will enjoy a majestic view of the Valley of Heroes, with access to the bustling trade district and scenic canals.",
        price: 350
      },
      {
        ownerId: 8,
        address: "2500 Orgrimmar Blvd",
        city: "Orgrimmar",
        state: "Durotar",
        country: "Azeroth",
        lat: 40.7128,
        lng: -74.0060,
        name: "Grommash Hold",
        description: "This sturdy, rugged fortress lies at the heart of Orgrimmar, home to Warchiefs past and present. Adventurers can immerse themselves in Horde culture and take in the fiery sunsets over the red dunes of Durotar.",
        price: 275
      },
      {
        ownerId: 9,
        address: "17 Kirin Tor Way",
        city: "Dalaran",
        state: "Crystalsong Forest",
        country: "Azeroth",
        lat: 47.6062,
        lng: -122.3321,
        name: "Dalaran Floating City Loft",
        description: "Enjoy a magical stay in the floating city of Dalaran, home to the Kirin Tor and some of the most powerful wizards in Azeroth. This luxurious loft offers panoramic views of Crystalsong Forest from above the clouds.",
        price: 500
      },
      {
        ownerId: 4,
        address: "999 Darkshire Ln",
        city: "Darkshire",
        state: "Duskwood",
        country: "Azeroth",
        lat: 34.0522,
        lng: -118.2437,
        name: "Darkshire Manor",
        description: "A mysterious and eerie manor in the heart of Duskwood. This location is perfect for adventurers seeking a hauntingly quiet escape. Explore the surrounding haunted woods, but beware of the lurking undead!",
        price: 150
      },
      {
        ownerId: 7,
        address: "420 Naxxramas Cir",
        city: "Naxxramas",
        state: "Dragonblight",
        country: "Azeroth",
        lat: 51.5074,
        lng: -0.1278,
        name: "Naxxramas Necropolis Suite",
        description: "A floating necropolis above Dragonblight, this is the ultimate stay for those with a dark side. Once home to the infamous lich Kel'Thuzad, this chilling suite offers eerie ambiance and frosty views of the tundra below.",
        price: 600
      },
      {
        ownerId: 4,
        address: "101 Sentinel Hill Ln",
        city: "Westfall",
        state: "Eastern Kingdoms",
        country: "Azeroth",
        lat: 37.7749,
        lng: -122.4194,
        name: "Sentinel Hill Homestead",
        description: "A charming, rustic retreat on the windswept plains of Westfall. Perfect for a quiet getaway with sweeping views of golden fields and a serene atmosphere. Just beware of the Defias Brotherhood!",
        price: 200
      },
      {
        ownerId: 5,
        address: "400 Dreamwalk Rd",
        city: "The Emerald Dream",
        state: "Unknown",
        country: "Azeroth",
        lat: 48.8566,
        lng: 2.3522,
        name: "Emerald Dream Glade",
        description: "A surreal and tranquil sanctuary within the Emerald Dream. This untouched forest offers serenity and a connection to nature like no other, ideal for druids and nature enthusiasts. Be prepared for an otherworldly experience.",
        price: 450
      },
      {
        ownerId: 4,
        address: "300 Zaralek Cave Rd",
        city: "Zaralek Cavern",
        state: "Dragon Isles",
        country: "Azeroth",
        lat: 35.6895,
        lng: 139.6917,
        name: "Zaralek Cavern Hideaway",
        description: "Hidden deep beneath the Dragon Isles, this cavernous hideaway offers visitors a mysterious and ancient setting, with glowing crystals and subterranean wonders. Explore the dragonkin ruins and enjoy the calm silence below.",
        price: 325
      },
      {
        ownerId: 5,
        address: "777 Amirdrassil Way",
        city: "Amirdrassil",
        state: "Emerald Dream",
        country: "Azeroth",
        lat: 52.5200,
        lng: 13.4050,
        name: "Amirdrassil Treehouse",
        description: "Nestled in the branches of the great World Tree, this enchanting treehouse offers unparalleled views of the Emerald Dream. Perfect for those seeking a magical retreat far from the troubles of the waking world.",
        price: 600
      },
      {
        ownerId: 4,
        address: "800 Hallowfall Ln",
        city: "Hallowfall",
        state: "Thaldraszus",
        country: "Azeroth",
        lat: 41.8781,
        lng: -87.6298,
        name: "Hallowfall Lake Cottage",
        description: "A peaceful cottage beside a crystal-clear lake in Hallowfall, surrounded by the towering cliffs of Thaldraszus. Perfect for relaxation, fishing, and quiet contemplation. Let the tranquility wash over you in this serene locale.",
        price: 280
      },
      {
        ownerId: 4,
        address: "222 Khaz Algar Ave",
        city: "Khaz Algar",
        state: "Unknown",
        country: "Azeroth",
        lat: 53.3498,
        lng: -6.2603,
        name: "Khaz Algar Dwarven Retreat",
        description: "An ancient dwarven stronghold carved into the mountains, Khaz Algar offers guests a rugged, subterranean adventure with access to ancient forges and echoing halls. Ideal for lovers of history and dwarven craftsmanship.",
        price: 400
      },
      {
        ownerId: 7,
        address: "600 Suramar Ln",
        city: "Suramar",
        state: "Broken Isles",
        country: "Azeroth",
        lat: 59.3293,
        lng: 18.0686,
        name: "Suramar Nightborne Villa",
        description: "This luxurious villa in the heart of Suramar is perfect for those who wish to experience the opulent lifestyle of the Nightborne. With access to fine wine and magical gardens, this stay offers elegance and charm beyond compare.",
        price: 550
      },
      {
        ownerId: 7,
        address: "1000 Silvermoon Cir",
        city: "Silvermoon City",
        state: "Eversong Woods",
        country: "Azeroth",
        lat: 55.7558,
        lng: 37.6173,
        name: "Silvermoon Elven Manor",
        description: "An exquisite elven manor within the gleaming city of Silvermoon. This property is a true work of art, with ornate designs and a tranquil atmosphere. Perfect for those who appreciate elven architecture and culture.",
        price: 475
      },
      {
        ownerId: 4,
        address: "33 Lakeshire Rd",
        city: "Redridge Mountains",
        state: "Eastern Kingdoms",
        country: "Azeroth",
        lat: 51.1657,
        lng: 10.4515,
        name: "Redridge Mountain Cabin",
        description: "A cozy cabin nestled in the Redridge Mountains, ideal for hikers and adventurers looking to explore the surrounding peaks. Enjoy peaceful nights by the fireplace with views of Lakeshire and the great stone bridge.",
        price: 175
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ["100 Stormwind Keep Rd", "2500 Orgrimmar Blvd", "17 Kirin Tor Way", "999 Darkshire Ln", "420 Naxxramas Cir", "101 Sentinel Hill Ln", "400 Dreamwalk Rd", "300 Zaralek Cave Rd", "777 Amirdrassil Way", "800 Hallowfall Ln", "222 Khaz Algar Ave", "600 Suramar Ln", "1000 Silvermoon Cir", "33 Lakeshire Rd"] }
    }, {});
  }
};
