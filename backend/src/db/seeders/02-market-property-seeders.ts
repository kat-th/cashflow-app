"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    options.tableName = "MarketProperties";
    return queryInterface.bulkInsert(
      options,
      [
        {
          address: "34 Prout St",
          city: "Quincy",
          state: "MA",
          zipcode: "02169",
          bedrooms: 4,
          bathrooms: 2,
          sqft: 1488,
          yearBuilt: 1900,
          lotSize: 3990,
          propertyType: "Single Family",
          listPrice: 649900,
          rentZestimate: 3440,
          listDate: new Date("2025-05-15"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "30 Balfour St",
          city: "Boston",
          state: "MA",
          zipcode: "02125",
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1620,
          yearBuilt: 2004,
          lotSize: 2475,
          propertyType: "Single Family",
          listPrice: 615000,
          rentZestimate: 4473,
          listDate: new Date("2025-06-04"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "175 Somerset Ave",
          city: "Winthrop",
          state: "MA",
          zipcode: "02152",
          bedrooms: 5,
          bathrooms: 2,
          sqft: 3970,
          yearBuilt: 1910,
          lotSize: 0,
          propertyType: "Multi Family",
          listPrice: 899900,
          rentZestimate: 8090,
          listDate: new Date("2025-06-11"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "315 Main St",
          city: "Everett",
          state: "MA",
          zipcode: "02149",
          bedrooms: 6,
          bathrooms: 3,
          sqft: 2128,
          yearBuilt: 1900,
          lotSize: 0,
          propertyType: "Multi Family",
          listPrice: 845000,
          rentZestimate: 7170,
          listDate: new Date("2025-05-10"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "225 Pleasant St",
          city: "Weymouth",
          state: "MA",
          zipcode: "02190",
          bedrooms: 4,
          bathrooms: 2,
          sqft: 2300,
          yearBuilt: 1983,
          lotSize: 12000,
          propertyType: "Multi Family",
          listPrice: 799900,
          rentZestimate: 6770,
          listDate: new Date("2025-01-20"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "7 Meridian Pkwy",
          city: "Malden",
          state: "MA",
          zipcode: "02148",
          bedrooms: 9,
          bathrooms: 2,
          sqft: 2889,
          yearBuilt: 1900,
          lotSize: 0,
          propertyType: "Multi Family",
          listPrice: 899900,
          rentZestimate: 7000,
          listDate: new Date("2025-06-05"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "25 Crandall St",
          city: "Roslindale",
          state: "MA",
          zipcode: "02131",
          bedrooms: 6,
          bathrooms: 2,
          sqft: 2308,
          yearBuilt: 1955,
          lotSize: 0,
          propertyType: "Multi Family",
          listPrice: 849000,
          rentZestimate: 8650,
          listDate: new Date("2024-10-12"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "18 Albion St #29",
          city: "Roxbury",
          state: "MA",
          zipcode: "02119",
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1276,
          yearBuilt: 2022,
          lotSize: 0,
          propertyType: "Condo",
          listPrice: 635000,
          rentZestimate: 3762,
          listDate: new Date("2025-05-03"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface: any, Sequelize: any) => {
    options.tableName = "MarketProperties";
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
