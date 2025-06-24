"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable(
      "PropertyImages",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        propertyId: {
          type: Sequelize.INTEGER,
          references: {
            model: "MarketProperties",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        url: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        preview: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
    options.tableName = "PropertyImages";
    return queryInterface.dropTable(options);
  },
};
