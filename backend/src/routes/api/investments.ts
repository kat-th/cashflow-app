import { NextFunction, Request, Response } from "express";
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import { handleValidationErrors } from "../../utils/validation";
import { investmentCalculator } from "../../utils/investmentCalculator";
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
import { IPropertyAnalysis } from "../../typings/data";

const { Op } = require("sequelize");

import db from "../../db/models";
import {
  Property,
  AnalysisInputs,
  CreateAnalysisBody,
} from "../../typings/data";
import { NoResourceError } from "../../errors/customErrors";
import { NextIndex } from "aws-sdk/clients/lexmodelsv2";

const { User, MarketProperty, InvestmentAnalysis, sequelize } = db;

const router = require("express").Router();

// Create / calculate investment analysis
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { propertyId } = req.params;
    const { inputs }: CreateAnalysisBody = req.body;

    // Validate property exists
    const property = await MarketProperty.findByPk(parseInt(propertyId));
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Validate inputs
    if (!inputs || typeof inputs !== "object") {
      return res.status(400).json({ error: "Invalid analysis inputs" });
    }

    const requiredFields = [
      "downPayment",
      "interestRate",
      "loanTerm",
      "propertyTaxRate",
      "insurance",
      "maintenance",
      "vacancy",
      "propertyManagement",
    ];

    for (const field of requiredFields) {
      if (
        !(field in inputs) ||
        typeof inputs[field as keyof AnalysisInputs] !== "number"
      ) {
        return res
          .status(400)
          .json({ error: `Invalid or missing field: ${field}` });
      }
    }

    // Calculate investment metrics
    const analysisResults = investmentCalculator(property, inputs);

    res.status(200).json({
      message: "Analysis calculated successfully",
      property: {
        id: property.id,
        address: property.address,
        city: property.city,
        state: property.state,
        listPrice: property.listPrice,
        rentZestimate: property.rentZestimate,
      },
      inputs,
      analysis: analysisResults,
    });
  } catch (error) {
    return next(error);
  }
});

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
              "rentZestimate",
              "propertyType",
              "listPrice",
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
        propertyType: analysis.MarketProperty?.propertyType,
        purchasePrice: analysis.MarketProperty?.listPrice,
        rentZestimate: analysis.MarketProperty?.rentZestimate,
        monthlyCashFlow: analysis.monthlyCashFlow,
        capRate: analysis.capRate,
        cashOnCashReturn: analysis.cashOnCashReturn,
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
