import { DataTypes, Model } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { sequelize } from "../sequelize";

class UserAndFeedConnection extends Model {
  public userUUID: string;
  public feedUUID: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

UserAndFeedConnection.init(
  {
    userUUID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    feedUUID: {
      type: DataTypes.UUID,
      allowNull: false
    },
  },
  makeModelOptions(sequelize, "user_and_feed_connection")
);

export default UserAndFeedConnection;
