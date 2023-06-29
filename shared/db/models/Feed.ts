import { DataTypes, Model } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { sequelize } from "../sequelize";

class Feed extends Model {
  public UUID: string;
  public userUUID: string;
  public name: string;
  public url: string;
  public description: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

Feed.init(
  {
    UUID: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    userUUID: {
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING(30),
    },
    url: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    }
  },
  makeModelOptions(sequelize, "feed")
);

export default Feed;
