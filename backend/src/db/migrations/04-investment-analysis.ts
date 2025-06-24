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
          allowNull: false,
        },
        downPayment: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        interestRate: {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: false,
        },
        loanTerm: {
          allowNull: false,
          type: Sequelize.DECIMAL(5, 2),
        },
        propertyTaxRate: {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: false,
        },
        insurance: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        maintenance: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        vacancy: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        propertyManagement: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        // Analysis result
        monthlyRent: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        totalMonthlyExpenses: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        monthlyCashFlow: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        cashOnCashReturn: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        netOperatingIncome: {
          type: Sequelize.INTEGER,
          // allowNull: false,
        },
        capRate: {
          type: Sequelize.DECIMAL(10, 2),
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
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        strategyReason: {
          type: Sequelize.STRING(100),
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
