"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable(
      "MarketProperties",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        address: {
          allowNull: false,
          type: Sequelize.STRING(100),
          unique: true,
        },
        city: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        zipcode: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        bedrooms: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        bathrooms: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        sqft: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        yearBuilt: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        lotSize: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        propertyType: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        listPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rentZestimate: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        listDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  down: async (queryInterface: any, Sequelize: any) => {
    options.tableName = "MarketProperties";
    return queryInterface.dropTable(options);
  },
};
