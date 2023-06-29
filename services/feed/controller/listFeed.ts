import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";
import { Feed } from "../../../shared/db/models";

export const listFeed = async (_params: IControllerParams<null>) => {
  const feed: Feed[] = await Feed.findAll()
  return {
    message: SUCCESSFUL,
    payload: feed
  };
};
