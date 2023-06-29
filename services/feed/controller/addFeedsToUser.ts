import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";
import { HttpBadRequest } from "../../../shared/lib/exceptions/HttpBadRequest";
import { IAddFeedToUser } from "../interfaces/IAddFeedToUser";
import { User } from "../../../shared/db/models";
import UserAndFeedConnection from "../../../shared/db/models/UserAndFeedConnection";
import { Op } from "sequelize";

export const addFeedsToUser = async (params: IControllerParams<IAddFeedToUser>) => {
  const transaction = params.transaction;
  let msg: UserAndFeedConnection[];

  const user = await User.findOne({
    where: {
      email: params.input.userEmail
    },
    attributes: ['UUID', 'email','role']
  })

  if (!user)
    throw new HttpBadRequest("given userEmail user not found");

  if (user.role === "Super Admin")
    throw new HttpBadRequest("you have no permission to add to super admin");

  // check permissions
  if (params.user.role === "Basic")
    throw new HttpBadRequest("you are not allowed to add list")
  else if (params.user.role === "Super Admin") {
    msg = await UserAndFeedConnection.bulkCreate(params.input.feedUUID.map((uuid: string) => ({ userUUID: user.UUID, feedUUID: uuid })), {
      transaction
    })
  }
  else if (params.user.role === "Admin") {
    // collecting list to be deleted
    const feedList: UserAndFeedConnection[] = await UserAndFeedConnection.findAll({
      where: {
        userUUID: params.user.uuid,
        feedUUID: { [Op.in]: params.input.feedUUID }
      }
    })

    msg = await UserAndFeedConnection.bulkCreate(feedList.map((uuid: UserAndFeedConnection) => ({ userUUID: user.UUID, feedUUID: uuid.feedUUID })), {
      transaction
    })
  }

  await transaction.commit();
  return {
    message: SUCCESSFUL,
    payload: msg
  };
};
