import {
  Association,
  CreationOptional,
  DataTypes,
  Model,
  Optional,
} from "sequelize";

const { Validator } = require("sequelize");

type PropertyImageAttributes = {
  id: number;
  propertyId: number;
  url: string;
  preview: boolean;
};

type PropertyImageCreationAttributes = Optional<PropertyImageAttributes, "id">;

module.exports = (sequelize: any, DataTypes: any) => {
  class PropertyImage extends Model<
    PropertyImageAttributes,
    PropertyImageCreationAttributes
  > {
    declare id: CreationOptional<number>;
    declare propertyId: number;
    declare url: string;
    declare preview: boolean;

    async getImage() {
      const image = {
        id: this.id,
        propertyId: this.propertyId,
        url: this.url,
        preview: this.preview,
      };
      return image;
    }

    static associate(models: any) {
      // Associations go here
      PropertyImage.belongsTo(models.MarketProperty, {
        foreignKey: "propertyId",
      });
    }
    // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };
  }
  PropertyImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "PropertyImage",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return PropertyImage;
};
