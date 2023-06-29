import { DataTypes, Model } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { sequelize } from "../sequelize";

class User extends Model {
  public UUID: string;
  public name: string;
  public role: string;
  public email: string;
  public password: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

User.init(
  {
    UUID: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING(30),
    },
    role: {
      type: DataTypes.ENUM("Super Admin", "Admin", "Basic"),
    },
    email: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(100),
    }
  },
  makeModelOptions(sequelize, "user")
);

export default User;
