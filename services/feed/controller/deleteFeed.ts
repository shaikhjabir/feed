import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";
import { HttpBadRequest } from "../../../shared/lib/exceptions/HttpBadRequest";
import { Feed, Permission, User } from "../../../shared/db/models";
import { Op } from "sequelize";
import UserAndFeedConnection from "../../../shared/db/models/UserAndFeedConnection";

export const deleteFeed = async (params: IControllerParams<{ feedUUID: string[] }>) => {
  const transaction = params.transaction;
  // check permissions
  if (params.user.role === "Basic")
    throw new HttpBadRequest("you are not allowed to delete")

  else if (params.user.role === "Admin") {
    const admin: any = await User.findByPk(params.user.uuid, {
      include: [Permission]
    })
    if (!admin.Permission.canDeleteFeed)
      throw new HttpBadRequest("permission not allocated to you for delete feeds")
  }

  // collection particular user feeds
  const user: any = await User.findOne({
    where: {
      UUID: params.user.uuid
    },
    include: {
      model: Feed,
      through: { attributes: [] }
    }
  })

  // collecting list to be deleted
  const listUUID: string[] = params.input.feedUUID.filter(feed => {
    return !!user.Feeds.find(findFeed => findFeed.UUID === feed)
  })

  if (listUUID.length === 0)
    throw new HttpBadRequest("feeds not found to be deleted")

  // clearing c tables
  await UserAndFeedConnection.destroy(
    {
      where: {
        userUUID: params.user.uuid,
        feedUUID: { [Op.in]: listUUID }
      },
      transaction
    }
  )

  // delete feed which comes under current user and matches with feedUUID payload
  const deleteFeed = await Feed.destroy({
    where: {
      UUID: {
        [Op.in]: listUUID
      }
    },
    transaction
  })
  await transaction.commit();

  return {
    message: SUCCESSFUL,
    payload: deleteFeed
  };
};
