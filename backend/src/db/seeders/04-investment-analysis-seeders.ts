"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    options.tableName = "InvestmentAnalyses";
    return queryInterface.bulkInsert(
      options,
      [
        {
          id: 1,
          userId: 2,
          propertyId: 1,
          downPayment: 20,
          interestRate: 6.75,
          loanTerm: 30,
          propertyTaxRate: 1.2,
          insurance: 1200,
          maintenance: 1,
          vacancy: 5,
          propertyManagement: 8,
          monthlyRent: 3200,
          totalMonthlyExpenses: 2775,
          monthlyCashFlow: 425,
          cashOnCashReturn: 5.25,
          netOperatingIncome: 32400,
          capRate: 6.7,
          onePercentRule: false,
          twoPercentRule: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          strategy: "Consider",
          strategyReason:
            "Moderate returns, analyze market appreciation potential",
        },
        {
          id: 2,
          userId: 1,
          propertyId: 3,
          downPayment: 15,
          interestRate: 7.25,
          loanTerm: 30,
          propertyTaxRate: 1.2,
          insurance: 1200,
          maintenance: 1,
          vacancy: 5,
          propertyManagement: 8,
          monthlyRent: 2500,
          totalMonthlyExpenses: 1850,
          monthlyCashFlow: 650,
          cashOnCashReturn: 17.3,
          netOperatingIncome: 27000,
          capRate: 12.0,
          onePercentRule: true,
          twoPercentRule: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          strategy: "Strong Buy",
          strategyReason: "Excellent cash-on-cash return above 12%",
        },
        {
          id: 3,
          userId: 1,
          propertyId: 4,
          downPayment: 15,
          interestRate: 6.5,
          loanTerm: 30,
          propertyTaxRate: 1.2,
          insurance: 1500,
          maintenance: 1.3,
          vacancy: 5,
          propertyManagement: 8,
          monthlyRent: 4500,
          totalMonthlyExpenses: 4250,
          monthlyCashFlow: 250,
          cashOnCashReturn: 2.4,
          netOperatingIncome: 42000,
          capRate: 6.7,
          onePercentRule: false,
          twoPercentRule: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          strategy: "Avoid",
          strategyReason: "Negative cash flow - expenses exceed rental income",
        },
      ],
      {}
    );
  },

  down: async (queryInterface: any, Sequelize: any) => {
    options.tableName = "InvestmentAnalyses";
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
