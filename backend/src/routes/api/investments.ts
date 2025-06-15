import { NextFunction, Request, Response } from "express";
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import { handleValidationErrors } from "../../utils/validation";
import { calculateInvestmentMetrics } from "../../utils/investmentCalculator";
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const { Op } = require("sequelize");

import db from "../../db/models";
import {
  Property,
  AnalysisInputs,
  CreateAnalysisBody,
} from "../../typings/data";
import { NoResourceError } from "../../errors/customErrors";
import { NextIndex } from "aws-sdk/clients/lexmodelsv2";

const { User, MarketProperty, sequelize } = db;

const router = require("express").Router();

// Create / calculate investment analysis
router.post(
  "/:propertyId/investment",
  async (req: Request, res: Response, next: NextFunction) => {
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
      const analysisResults = calculateInvestmentMetrics(property, inputs);

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
  }
);

// Get default analysis for specific property
router.get(
  "/:propertyId/investment",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { propertyId } = req.params;

      // Validate property exists
      const property = await MarketProperty.findByPk(parseInt(propertyId));
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      // Return default calculation
      const defaultInputs: AnalysisInputs = {
        downPayment: 20,
        interestRate: 7.5,
        loanTerm: 30,
        propertyTaxRate: 1.2,
        insurance: 1200,
        maintenance: 1,
        vacancy: 5,
        propertyManagement: 8,
      };

      const defaultResults = calculateInvestmentMetrics(
        property,
        defaultInputs
      );

      res.json({
        property: {
          id: property.id,
          address: property.address,
          city: property.city,
          state: property.state,
          listPrice: property.listPrice,
          rentZestimate: property.rentZestimate,
        },
        inputs: defaultInputs,
        analysis: defaultResults,
        isDefault: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export = router;
