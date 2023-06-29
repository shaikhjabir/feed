import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";
import { ICreateFeed } from "../interfaces/ICreateFeed";
import { HttpBadRequest } from "../../../shared/lib/exceptions/HttpBadRequest";
import { Feed } from "../../../shared/db/models";

export const createFeed = async (params: IControllerParams<ICreateFeed>) => {
  const transaction = params.transaction;
  if (params.req.user.role !== "Super Admin")
    throw new HttpBadRequest("only super admin can create feed")

  await Feed.create({ ...params.input, userUUID: params.user.uuid }, {
    transaction
  })

  await transaction.commit();
  return {
    message: SUCCESSFUL
  };
};
