import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";
import { Feed, User } from "../../../shared/db/models";

export const listFeed = async (params: IControllerParams<null>) => {
  let feed: any;
  if (params.user.role === "Super Admin") {
    const temp = await Feed.findAll()
    feed = { Feeds: temp }
  } else {
    feed = await User.findOne({
      where: {
        UUID: params.user.uuid
      },
      attributes: [],
      include: {
        model: Feed,
        through: { attributes: [] }
      }
    })
  }
  return {
    message: SUCCESSFUL,
    payload: feed
  };
};
