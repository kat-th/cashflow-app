import { NextFunction, Request, Response } from "express";
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import { handleValidationErrors } from "../../utils/validation";
import { investmentCalculator } from "../../utils/investmentCalculator";
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
import {
  IPropertyAnalysis,
  IInvestmentAnalysisResult,
} from "../../typings/data";

const { Op } = require("sequelize");

import db from "../../db/models";
import {
  Property,
  AnalysisInputs,
  CreateAnalysisBody,
} from "../../typings/data";

const { User, MarketProperty, InvestmentAnalysis, sequelize } = db;

const router = require("express").Router();

// Create / calculate investment analysis
// router.post("/", async (req: AuthReq, res: Response, next: NextFunction) => {
//   try {
//     const inputs = req.body;

//     // Validate inputs
//     if (!inputs || typeof inputs !== "object") {
//       return res.status(400).json({ error: "Invalid analysis inputs" });
//     }

//     const requiredFields = [
//       "purchasePrice",
//       "monthlyRent",
//       "downPayment",
//       "interestRate",
//       "loanTerm",
//       "insurance",
//       "maintenance",
//       "vacancy",
//       "propertyTaxRate",
//       "propertyManagement",
//     ];

//     for (const field of requiredFields) {
//       if (
//         !(field in inputs) ||
//         typeof inputs[field as keyof AnalysisInputs] !== "number"
//       ) {
//         return res
//           .status(400)
//           .json({ error: `Invalid or missing field: ${field}` });
//       }
//     }

//     let property = null;
//     let purchasePrice = inputs.purchasePrice;
//     let monthlyRent = inputs.monthlyRent;

//     // If propertyId is provided, try to link to existing property
//     if (inputs.address) {
//       // Search for property by address (case-insensitive, partial match)
//       property = await MarketProperty.findOne({
//         where: {
//           address: {
//             [Op.iLike]: `%${inputs.address.trim()}%`, // PostgreSQL case-insensitive search
//           },
//         },
//       });
//     }

//     // Ensure we have required values (already validated above, but double-check)
//     if (!purchasePrice || !monthlyRent) {
//       return res.status(400).json({
//         error: "purchasePrice and monthlyRent are required",
//       });
//     }

//     const analysisInputs = {
//       ...inputs,
//       purchasePrice,
//       monthlyRent,
//     };

//     // Calculate investment metrics
//     const analysisResults = investmentCalculator(property, analysisInputs);

//     // Create new investment analysis record in database
//     const savedAnalysis = await InvestmentAnalysis.create({
//       userId: req.user.id,
//       propertyId: property ? property.id : null,
//       downPayment: inputs.downPayment,
//       interestRate: inputs.interestRate,
//       loanTerm: inputs.loanTerm,
//       insurance: inputs.insurance,
//       maintenance: inputs.maintenance,
//       vacancy: inputs.vacancy,
//       propertyTaxRate: inputs.propertyTaxRate,
//       propertyManagement: inputs.propertyManagement,
//       monthlyRent: monthlyRent,
//       purchasePrice: purchasePrice,
//       totalMonthlyExpenses: analysisResults.totalMonthlyExpenses,
//       monthlyCashFlow: analysisResults.monthlyCashFlow,
//       cashOnCashReturn: analysisResults.cashOnCashReturn,
//       netOperatingIncome: analysisResults.netOperatingIncome,
//       capRate: analysisResults.capRate,
//       onePercentRule: analysisResults.onePercentRule,
//       twoPercentRule: analysisResults.twoPercentRule,
//       strategy: analysisResults.strategy,
//       strategyReason: analysisResults.strategyReason,
//     });

//     const responseData: any = {
//       message: "Analysis created successfully",
//       inputs: analysisInputs,
//       analysis: savedAnalysis.toJSON(),
//       propertyFound: !!property,
//     };

//     res.status(200).json(responseData);
//   } catch (error) {
//     return next(error);
//   }
// });

//Get saved analyses

router.get(
  "/current",
  requireAuth,
  async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
      const userAnalyses = await InvestmentAnalysis.findAll({
        where: {
          userId: req.user.id,
        },
        include: [
          {
            model: MarketProperty,
            attributes: [
              "address",
              "city",
              "state",
              "zipcode",
              "propertyType",
              "listPrice",
              "rentZestimate",
            ],
          },
        ],
      });

      const data = userAnalyses.map((analysis: IPropertyAnalysis) => ({
        id: analysis.id,
        userId: analysis.userId,
        address: analysis.MarketProperty?.address,
        city: analysis.MarketProperty?.city,
        state: analysis.MarketProperty?.state,
        downPayment: analysis.downPayment,
        interestRate: analysis.interestRate,
        loanTerm: analysis.loanTerm,
        insurance: analysis.insurance,
        maintenance: analysis.maintenance,
        vacancy: analysis.vacancy,
        propertyTaxRate: analysis.propertyTaxRate,
        propertyManagement: analysis.propertyManagement,
        propertyType: analysis.MarketProperty?.propertyType,
        purchasePrice:
          analysis.purchasePrice || analysis.MarketProperty?.listPrice, //need to add user's purchase price
        monthlyRent:
          analysis.monthlyRent || analysis.MarketProperty?.rentZestimate,
        totalMonthlyExpenses: analysis.totalMonthlyExpenses,
        monthlyCashFlow: analysis.monthlyCashFlow,
        cashOnCashReturn: analysis.cashOnCashReturn,
        netOperatingIncome: analysis.netOperatingIncome,
        capRate: analysis.capRate,
        onePercentRule: analysis.onePercentRule,
        twoPercentRule: analysis.twoPercentRule,
        createdAt: analysis.createdAt,
        updatedAt: analysis.updatedAt,
      }));

      const response = { userAnalyses: data };

      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// Update an Analysis from user Profile
router.put(
  "/:analysisId",
  requireAuth,
  async (req: AuthReq, res: Response, next: NextFunction) => {
    const { analysisId } = req.params;
    const {
      downPayment,
      interestRate,
      loanTerm,
      propertyTaxRate,
      insurance,
      maintenance,
      vacancy,
      propertyManagement,
      purchasePrice,
      monthlyRent,
      totalMonthlyExpenses,
      monthlyCashFlow,
      cashOnCashReturn,
      netOperatingIncome,
      capRate,
      onePercentRule,
      twoPercentRule,
      strategy,
      strategyReason,
    } = req.body;

    const analysisToUpdate = await InvestmentAnalysis.findByPk(analysisId);

    if (!analysisToUpdate) {
      return res.status(404).json({
        message: "Analysis couldn't be found",
      });
    }
    if (req.user.id !== analysisToUpdate.userId) {
      return res.status(403).json({
        message: "You do not own this analysis",
      });
    }
    await analysisToUpdate.update({
      downPayment: downPayment,
      interestRate: interestRate,
      loanTerm: loanTerm,
      propertyTaxRate: propertyTaxRate,
      insurance: insurance,
      maintenance: maintenance,
      vacancy: vacancy,
      propertyManagement: propertyManagement,
      purchasePrice: purchasePrice,
      monthlyRent: monthlyRent,
      totalMonthlyExpenses: totalMonthlyExpenses,
      monthlyCashFlow: monthlyCashFlow,
      cashOnCashReturn: cashOnCashReturn,
      netOperatingIncome: netOperatingIncome,
      capRate: capRate,
      onePercentRule: onePercentRule,
      twoPercentRule: twoPercentRule,
      strategy: strategy,
      strategyReason: strategyReason,
    });
    return res.status(200).json(analysisToUpdate);
  }
);

// Delete an Analysis from user Profile
router.delete(
  "/:analysisId",
  requireAuth,
  async (req: AuthReq, res: Response, next: NextFunction) => {
    const { analysisId } = req.params;
    const analysisToDelete = await InvestmentAnalysis.findByPk(analysisId);

    if (!analysisToDelete) {
      return res.status(404).json({
        message: "Analysis couldn't be found",
      });
    }

    if (!req.user || req.user.id !== analysisToDelete.userId) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await analysisToDelete.destroy();
    return res.json({
      message: "Successfully deleted",
    });
  }
);

export = router;
