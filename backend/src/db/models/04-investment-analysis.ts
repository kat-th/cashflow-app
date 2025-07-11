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
  purchasePrice: number;
  monthlyRent: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  netOperatingIncome: number;
  capRate: number;
  onePercentRule: boolean;
  twoPercentRule: boolean;
  strategy: string;
  strategyReason: string;
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
    declare purchasePrice: number;
    declare monthlyRent: number;
    declare totalMonthlyExpenses: number;
    declare monthlyCashFlow: number;
    declare cashOnCashReturn: number;
    declare netOperatingIncome: number;
    declare capRate: number;
    declare onePercentRule: boolean;
    declare twoPercentRule: boolean;
    declare strategy: string;
    declare strategyReason: string;

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
        purchasePrice: this.purchasePrice,
        monthlyRent: this.monthlyRent,
        totalMonthlyExpenses: this.totalMonthlyExpenses,
        monthlyCashFlow: this.monthlyCashFlow,
        cashOnCashReturn: this.cashOnCashReturn,
        netOperatingIncome: this.netOperatingIncome,
        capRate: this.capRate,
        onePercentRule: this.onePercentRule,
        twoPercentRule: this.twoPercentRule,
        strategy: this.strategy,
        strategyReason: this.strategyReason,
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
      },
      downPayment: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      interestRate: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      loanTerm: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          isGoodValue(value: number) {
            if (value < 5 || value > 30) {
              throw new Error("Loan term must be between 5 and 30");
            }
          },
        },
      },
      propertyTaxRate: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      insurance: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      maintenance: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      vacancy: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      propertyManagement: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      purchasePrice: {
        type: DataTypes.NUMERIC,
      },
      monthlyRent: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      monthlyCashFlow: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      cashOnCashReturn: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      totalMonthlyExpenses: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      strategy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      strategyReason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      netOperatingIncome: {
        type: DataTypes.NUMERIC,
        // allowNull: false,
      },
      capRate: {
        type: DataTypes.NUMERIC,
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
