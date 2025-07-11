"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable(
      "InvestmentAnalyses",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        propertyId: {
          type: Sequelize.INTEGER,
        },
        downPayment: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        interestRate: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        loanTerm: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        propertyTaxRate: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        insurance: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        maintenance: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        vacancy: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        propertyManagement: {
          allowNull: false,
          type: Sequelize.NUMERIC,
        },
        purchasePrice: {
          type: Sequelize.NUMERIC,
        },
        monthlyRent: {
          type: Sequelize.NUMERIC,
        },
        // Analysis result
        totalMonthlyExpenses: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        monthlyCashFlow: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        cashOnCashReturn: {
          allowNull: false,
          type: Sequelize.NUMERIC,
        },
        netOperatingIncome: {
          type: Sequelize.NUMERIC,
          // allowNull: false,
        },
        capRate: {
          type: Sequelize.NUMERIC,
          // allowNull: false,
        },
        onePercentRule: {
          type: Sequelize.BOOLEAN,
          // allowNull: false,
        },
        twoPercentRule: {
          type: Sequelize.BOOLEAN,
          // allowNull: false,
        },
        strategy: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        strategyReason: {
          type: Sequelize.STRING(500),
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
    options.tableName = "InvestmentAnalyses";
    return queryInterface.dropTable(options);
  },
};
