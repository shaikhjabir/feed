import { DataTypes, Model } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { sequelize } from "../sequelize";

class Permission extends Model {
  public adminUUID: string;
  public canDeleteFeed: boolean;
  
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

Permission.init(
  {
    adminUUID: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    canDeleteFeed: {
      type: DataTypes.BOOLEAN
    }
  },
  makeModelOptions(sequelize, "permission")
);

export default Permission;
