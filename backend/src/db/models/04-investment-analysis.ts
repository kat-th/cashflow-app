import {
  Association,
  CreationOptional,
  DataTypes,
  Model,
  Optional,
} from "sequelize";

const { Validator } = require("sequelize");

type InvestmentAnalysisAttributes = {
  id: number;
  userId: number;
  propertyId: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  insurance: number;
  maintenance: number;
  vacancy: number;
  propertyManagement: number;
  monthlyRent: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  netOperatingIncome: number;
  capRate: number;
  onePercentRule: boolean;
  twoPercentRule: boolean;
  // annualCashFlow: number;
  strategy: string;
  strategyReason: string;
  // monthlyMortgage: number;
  // monthlyPropertyTax: number;
  // monthlyInsurance: number;
  // monthlyMaintenance: number;
  // monthlyVacancy: number;
  // monthlyPropMgmt: number;
};

type InvestmentAnalysisCreationAttributes = Optional<
  InvestmentAnalysisAttributes,
  "id"
>;

module.exports = (sequelize: any, DataTypes: any) => {
  class InvestmentAnalysis extends Model<
    InvestmentAnalysisAttributes,
    InvestmentAnalysisCreationAttributes
  > {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare propertyId: number;
    declare downPayment: number;
    declare interestRate: number;
    declare loanTerm: number;
    declare propertyTaxRate: number;
    declare insurance: number;
    declare maintenance: number;
    declare vacancy: number;
    declare propertyManagement: number;
    declare monthlyRent: number;
    declare totalMonthlyExpenses: number;
    declare monthlyCashFlow: number;
    declare cashOnCashReturn: number;
    // declare annualCashFlow: number;
    declare netOperatingIncome: number;
    declare capRate: number;
    declare onePercentRule: boolean;
    declare twoPercentRule: boolean;
    declare strategy: string;
    declare strategyReason: string;
    // declare monthlyMortgage: number;
    // declare monthlyPropertyTax: number;
    // declare monthlyInsurance: number;
    // declare monthlyMaintenance: number;
    // declare monthlyVacancy: number;
    // declare monthlyPropMgmt: number;

    async getAnalysis() {
      const analysis = {
        id: this.id,
        userId: this.userId,
        propertyId: this.propertyId,
        downPayment: this.downPayment,
        interestRate: this.interestRate,
        loanTerm: this.loanTerm,
        propertyTaxRate: this.propertyTaxRate,
        insurance: this.insurance,
        maintenance: this.maintenance,
        vacancy: this.vacancy,
        propertyManagement: this.propertyManagement,
        monthlyRent: this.monthlyRent,
        totalMonthlyExpenses: this.totalMonthlyExpenses,
        monthlyCashFlow: this.monthlyCashFlow,
        cashOnCashReturn: this.cashOnCashReturn,
        // annualCashFlow: this.annualCashFlow,
        netOperatingIncome: this.netOperatingIncome,
        capRate: this.capRate,
        onePercentRule: this.onePercentRule,
        twoPercentRule: this.twoPercentRule,
        strategy: this.strategy,
        strategyReason: this.strategyReason,
        // monthlyMortgage: this.monthlyMortgage,
        // monthlyPropertyTax: this.monthlyPropertyTax,
        // monthlyInsurance: this.monthlyInsurance,
        // monthlyMaintenance: this.monthlyMaintenance,
        // monthlyVacancy: this.monthlyVacancy,
        // monthlyPropMgmt: this.monthlyPropMgmt,
      };
      return analysis;
    }

    static associate(models: any) {
      // Associations go here
      InvestmentAnalysis.belongsTo(models.MarketProperty, {
        foreignKey: "propertyId",
      });
      InvestmentAnalysis.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
    // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };
  }
  InvestmentAnalysis.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      downPayment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      interestRate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      loanTerm: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isGoodValue(value: number) {
            if (value < 5 || value > 20) {
              throw new Error("Loan term must be between 5 and 30");
            }
          },
        },
      },
      propertyTaxRate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      insurance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maintenance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vacancy: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      propertyManagement: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      monthlyRent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monthlyCashFlow: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cashOnCashReturn: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      totalMonthlyExpenses: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      strategy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      strategyReason: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      netOperatingIncome: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      capRate: {
        type: DataTypes.DECIMAL(5, 2),
        // allowNull: false,
      },
      onePercentRule: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
      },
      twoPercentRule: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "InvestmentAnalysis",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return InvestmentAnalysis;
};
