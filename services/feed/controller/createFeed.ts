import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";
import { ICreateFeed } from "../interfaces/ICreateFeed";

export const createFeed = async (params: IControllerParams<ICreateFeed>) => {
  const transaction = params.transaction;

  await transaction.commit();
  return {
    message: SUCCESSFUL
  };
};
