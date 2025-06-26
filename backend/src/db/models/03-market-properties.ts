import {
  Association,
  CreationOptional,
  DataTypes,
  Model,
  Optional,
} from "sequelize";

const { Validator } = require("sequelize");

type MarketPropertyAttributes = {
  id: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  listPrice: number;
  rentZestimate: number;
  listDate: Date;
};

type MarketPropertyCreationAttributes = Optional<
  MarketPropertyAttributes,
  "id"
>;

module.exports = (sequelize: any, DataTypes: any) => {
  class MarketProperty extends Model<
    MarketPropertyAttributes,
    MarketPropertyCreationAttributes
  > {
    declare id: CreationOptional<number>;
    declare address: string;
    declare city: string;
    declare state: string;
    declare zipcode: string;
    declare bedrooms: number;
    declare bathrooms: number;
    declare sqft: number;
    declare yearBuilt: number;
    declare lotSize: number;
    declare propertyType: string;
    declare listPrice: number;
    declare rentZestimate: number;
    declare listDate: Date;

    async getProperty() {
      const property = {
        id: this.id,
        address: this.address,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
        sqft: this.sqft,
        yearBuilt: this.yearBuilt,
        lotSize: this.lotSize,
        propertyType: this.propertyType,
        listPrice: this.listPrice,
        rentZestimate: this.rentZestimate,
        listDate: this.listDate,
      };
      return property;
    }

    static associate(models: any) {
      // Associations go here
      MarketProperty.hasMany(models.PropertyImage, {
        as: "images",
        foreignKey: "propertyId",
      });
      MarketProperty.hasMany(models.InvestmentAnalysis, {
        as: "analyses",
        foreignKey: "propertyId",
      });
    }
    // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };
  }
  MarketProperty.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isGoodLength(value: string) {
            if (value.length < 1 || value.length > 30) {
              throw new Error("First name must be between 1 - 50 characters");
            }
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 5],
        },
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isGoodValue(value: number) {
            if (value < 0 || value > 20) {
              throw new Error("Bedrooms must be between 0 and 20");
            }
          },
        },
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isGoodValue(value: number) {
            if (value < 0 || value > 20) {
              throw new Error("Bathrooms must be between 0 and 20");
            }
          },
        },
      },
      sqft: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      yearBuilt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lotSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      propertyType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      listPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rentZestimate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      listDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MarketProperty",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return MarketProperty;
};
