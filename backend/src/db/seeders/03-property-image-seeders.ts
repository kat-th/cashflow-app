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
          url: "https://photos.zillowstatic.com/fp/35e2896f7f48471cf297dba8a92cf170-cc_ft_768.webp",
          preview: true,
        },
        {
          propertyId: 1,
          url: "https://photos.zillowstatic.com/fp/561cb3c7289f04d722dfd55c121b40f6-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 1,
          url: "https://photos.zillowstatic.com/fp/a3f8a7641c1628e755d517fedfb25762-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 1,
          url: "https://photos.zillowstatic.com/fp/205fb22aaca9360543fa43bad0bc4d9d-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 2,
          url: "https://photos.zillowstatic.com/fp/519e339325107edd037060ac502dba64-cc_ft_768.webp",
          preview: true,
        },
        {
          propertyId: 2,
          url: "https://photos.zillowstatic.com/fp/561cb3c7289f04d722dfd55c121b40f6-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 2,
          url: "https://photos.zillowstatic.com/fp/a3f8a7641c1628e755d517fedfb25762-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 2,
          url: "https://photos.zillowstatic.com/fp/205fb22aaca9360543fa43bad0bc4d9d-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 3,
          url: "https://photos.zillowstatic.com/fp/854089f9fb4d5401aae9acc55f83ca55-cc_ft_768.webp",
          preview: true,
        },
        {
          propertyId: 3,
          url: "https://photos.zillowstatic.com/fp/561cb3c7289f04d722dfd55c121b40f6-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 3,
          url: "https://photos.zillowstatic.com/fp/a3f8a7641c1628e755d517fedfb25762-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 3,
          url: "https://photos.zillowstatic.com/fp/205fb22aaca9360543fa43bad0bc4d9d-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 4,
          url: "https://photos.zillowstatic.com/fp/35e2896f7f48471cf297dba8a92cf170-cc_ft_768.webp",
          preview: true,
        },
        {
          propertyId: 4,
          url: "https://photos.zillowstatic.com/fp/561cb3c7289f04d722dfd55c121b40f6-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 4,
          url: "https://photos.zillowstatic.com/fp/a3f8a7641c1628e755d517fedfb25762-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 4,
          url: "https://photos.zillowstatic.com/fp/205fb22aaca9360543fa43bad0bc4d9d-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 5,
          url: "https://photos.zillowstatic.com/fp/519e339325107edd037060ac502dba64-cc_ft_768.webp",
          preview: true,
        },
        {
          propertyId: 5,
          url: "https://photos.zillowstatic.com/fp/561cb3c7289f04d722dfd55c121b40f6-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 5,
          url: "https://photos.zillowstatic.com/fp/a3f8a7641c1628e755d517fedfb25762-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 5,
          url: "https://photos.zillowstatic.com/fp/205fb22aaca9360543fa43bad0bc4d9d-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 6,
          url: "https://photos.zillowstatic.com/fp/854089f9fb4d5401aae9acc55f83ca55-cc_ft_768.webp",
          preview: true,
        },
        {
          propertyId: 6,
          url: "https://photos.zillowstatic.com/fp/561cb3c7289f04d722dfd55c121b40f6-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 6,
          url: "https://photos.zillowstatic.com/fp/a3f8a7641c1628e755d517fedfb25762-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 6,
          url: "https://photos.zillowstatic.com/fp/205fb22aaca9360543fa43bad0bc4d9d-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 7,
          url: "https://photos.zillowstatic.com/fp/90256876f2985a841a6ac69121f921de-cc_ft_768.webp",
          preview: true,
        },
        {
          propertyId: 7,
          url: "https://photos.zillowstatic.com/fp/561cb3c7289f04d722dfd55c121b40f6-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 7,
          url: "https://photos.zillowstatic.com/fp/a3f8a7641c1628e755d517fedfb25762-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 7,
          url: "https://photos.zillowstatic.com/fp/205fb22aaca9360543fa43bad0bc4d9d-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 8,
          url: "https://photos.zillowstatic.com/fp/1f8ced2960996942c0b8b9280b6463b9-cc_ft_384.webp",
          preview: true,
        },
        {
          propertyId: 8,
          url: "https://photos.zillowstatic.com/fp/561cb3c7289f04d722dfd55c121b40f6-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 8,
          url: "https://photos.zillowstatic.com/fp/a3f8a7641c1628e755d517fedfb25762-cc_ft_384.webp",
          preview: false,
        },
        {
          propertyId: 8,
          url: "https://photos.zillowstatic.com/fp/205fb22aaca9360543fa43bad0bc4d9d-cc_ft_384.webp",
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
