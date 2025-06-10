"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    options.tableName = "PropertyImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          propertyId: 1,
          url: "https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png",
          preview: true,
        },
        {
          propertyId: 1,
          url: "https://photos.zillowstatic.com/fp/567d547424a28ae204b26ce66d519303-cc_ft_1152.webp",
          preview: false,
        },
        {
          propertyId: 1,
          url: "https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png",
          preview: false,
        },
        {
          propertyId: 2,
          url: "https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png",
          preview: true,
        },
        {
          propertyId: 2,
          url: "https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png",
          preview: false,
        },
        {
          propertyId: 2,
          url: "https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png",
          preview: false,
        },
        {
          propertyId: 3,
          url: "https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png",
          preview: true,
        },
        {
          propertyId: 3,
          url: "https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png",
          preview: false,
        },
        {
          propertyId: 3,
          url: "https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png",
          preview: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface: any, Sequelize: any) => {
    options.tableName = "PropertyImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: [""] },
      },
      {}
    );
  },
};
