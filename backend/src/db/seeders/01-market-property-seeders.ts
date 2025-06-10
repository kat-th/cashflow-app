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
          address: "123 Main Street",
          city: "Boston",
          state: "Massachusetts",
          zipcode: "02101",
          bedrooms: 3,
          bathrooms: 2.5,
          sqft: 2150,
          yearBuilt: 2010,
          lotSize: 7500,
          propertyType: "Single Family",
          listPrice: 875000,
          listDate: new Date("2025-05-15"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "456 Ocean Drive",
          city: "Miami",
          state: "Florida",
          zipcode: "33139",
          bedrooms: 2,
          bathrooms: 2.0,
          sqft: 1200,
          yearBuilt: 2018,
          lotSize: 0,
          propertyType: "Condo",
          listPrice: 650000,
          listDate: new Date("2025-06-01"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "789 Tech Boulevard",
          city: "Austin",
          state: "Texas",
          zipcode: "78701",
          bedrooms: 4,
          bathrooms: 3.0,
          sqft: 2800,
          yearBuilt: 2015,
          lotSize: 8200,
          propertyType: "Single Family",
          listPrice: 725000,
          listDate: new Date("2025-04-28"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "321 Broadway Avenue",
          city: "New York",
          state: "New York",
          zipcode: "10001",
          bedrooms: 1,
          bathrooms: 1.0,
          sqft: 650,
          yearBuilt: 1985,
          lotSize: 0, // Condo - no lot
          propertyType: "Condo",
          listPrice: 950000,
          listDate: new Date("2025-05-10"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "555 Mountain View Road",
          city: "Denver",
          state: "Colorado",
          zipcode: "80202",
          bedrooms: 5,
          bathrooms: 4.5,
          sqft: 3500,
          yearBuilt: 2020,
          lotSize: 12000,
          propertyType: "Single Family",
          listPrice: 1250000,
          listDate: new Date("2025-01-20"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "888 Lake Shore Drive",
          city: "Chicago",
          state: "Illinois",
          zipcode: "60611",
          bedrooms: 3,
          bathrooms: 2.0,
          sqft: 1800,
          yearBuilt: 2012,
          lotSize: 0,
          propertyType: "Condo",
          listPrice: 485000,
          listDate: new Date("2025-06-05"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "147 Historic Lane",
          city: "Charleston",
          state: "South Carolina",
          zipcode: "29401",
          bedrooms: 4,
          bathrooms: 3.5,
          sqft: 2650,
          yearBuilt: 1920,
          lotSize: 6800,
          propertyType: "Single Family",
          listPrice: 895000,
          listDate: new Date("2025-05-12"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "963 Vineyard Circle",
          city: "Napa",
          state: "California",
          zipcode: "94558",
          bedrooms: 6,
          bathrooms: 5.0,
          sqft: 4200,
          yearBuilt: 2008,
          lotSize: 25000,
          propertyType: "Single Family",
          listPrice: 2150000,
          listDate: new Date("2025-06-08"),
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
