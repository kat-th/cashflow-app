import { NextFunction, Request, Response } from "express";
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import { handleValidationErrors } from "../../utils/validation";
import { investmentCalculator } from "../../utils/investmentCalculator";
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const { Op } = require("sequelize");

import db from "../../db/models";
import { Property } from "../../typings/data";
import { NoResourceError } from "../../errors/customErrors";

const { User, UserImage, MarketProperty, PropertyImage, sequelize } = db;

const router = require("express").Router();

// Get all properties
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const properties = await MarketProperty.findAll({
      attributes: [
        "id",
        "address",
        "city",
        "state",
        "zipcode",
        "bedrooms",
        "bathrooms",
        "sqft",
        "yearBuilt",
        "lotSize",
        "propertyType",
        "listPrice",
        "listDate",
      ],
      include: [
        {
          model: PropertyImage,
          as: "images",
          attributes: ["url"],
          where: {
            preview: true,
          },
          required: false,
        },
      ],
    });

    // include default investment analysis to each proeprty info
    const response = await Promise.allSettled(
      properties.map(async (property: any) => {
        const propertyData = property.toJSON();
        const images = propertyData.images || [];
        try {
          const defaultInputs = {
            downPayment: 20,
            interestRate: 7.5,
            loanTerm: 30,
            propertyTaxRate: 1.2,
            insurance: 1200,
            maintenance: 1,
            vacancy: 5,
            propertyManagement: 8,
          };

          const investmentResults = investmentCalculator(
            propertyData,
            defaultInputs
          );

          return {
            ...propertyData,
            previewImage: images[0]?.url || null,
            images: undefined,
            investmentAnalysis: {
              cashOnCashReturn: investmentResults.cashOnCashReturn,
              monthlyCashFlow: investmentResults.monthlyCashFlow,
              annualCashFlow: investmentResults.annualCashFlow,
              strategy: investmentResults.strategy,
              strategyReason: investmentResults.strategyReason,
              totalMonthlyExpenses: investmentResults.totalMonthlyExpenses,
              monthlyRent: investmentResults.monthlyRent,
            },
          };
        } catch (calculationError) {
          console.error("Error");
          return {
            ...propertyData,
            previewImage: images[0]?.url || null,
            images: undefined,
            investmentAnalysis: null,
          };
        }
      })
    );
    const successfulResponses = response
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return res.json(successfulResponses);
  } catch (error) {
    console.error("Error getting properties with investment analysis", error);
    return next(error);
  }
});

// Get detail of a property
router.get(
  "/:propertyId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { propertyId } = req.params;
      const property = await MarketProperty.findByPk(propertyId, {
        include: [
          {
            model: PropertyImage,
            as: "images",
            attributes: ["url", "preview"],
            required: false,
          },
        ],
      });

      if (!property) {
        return res.status(404).json({
          message: "Property not found",
        });
      }

      const propertyData = property.toJSON();
      const images = propertyData.images || [];

      const previewImage = images.find((img: any) => img.preview === true);
      try {
        const defaultInputs = {
          downPayment: 20,
          interestRate: 7.5,
          loanTerm: 30,
          propertyTaxRate: 1.2,
          insurance: 1200,
          maintenance: 1,
          vacancy: 5,
          propertyManagement: 8,
        };

        const investmentResults = investmentCalculator(
          propertyData,
          defaultInputs
        );

        const response = {
          ...propertyData,
          previewImage: previewImage?.url || null,
          images: images.map((img: any) => img.url),
          investmentAnalysis: {
            cashOnCashReturn: investmentResults.cashOnCashReturn,
            monthlyCashFlow: investmentResults.monthlyCashFlow,
            annualCashFlow: investmentResults.annualCashFlow,
            strategy: investmentResults.strategy,
            strategyReason: investmentResults.strategyReason,
            totalMonthlyExpenses: investmentResults.totalMonthlyExpenses,
            monthlyRent: investmentResults.monthlyRent,
          },
        };
        return res.json(response);
      } catch (calculationError) {
        console.error(
          "Error calculating investment analysis for property detail:",
          calculationError
        );

        const response = {
          ...propertyData,
          previewImage: previewImage?.url || null,
          images: images.map((img: any) => img.url),
          investmentAnalysis: null,
        };

        return res.json(response);
      }
    } catch (error) {
      console.error("Error getting properties", error);
      return next(error);
    }
  }
);

// Create analysis for a property

// Delete an analysis for a property

// Get all analysis for a property

export = router;
