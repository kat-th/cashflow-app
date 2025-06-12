import { NextFunction, Request, Response } from "express";
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import { handleValidationErrors } from "../../utils/validation";
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

    const response = properties.map((property: any) => {
      const propertyData = property.toJSON();
      const images = propertyData.images || [];

      return {
        ...propertyData,
        previewImage: images[0]?.url || null,
        images: undefined,
      };
    });
    return res.json(response);
  } catch (error) {
    console.error("Error getting properties", error);
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
      const response = {
        ...propertyData,
        previewImage: previewImage?.url || null,
        images: images.map((img: any) => img.url),
      };

      return res.json(response);
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
