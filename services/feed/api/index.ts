import { Router } from "express";
import { controllerHandler } from "../../../shared/lib/controllerHandler";
import { createFeed, deleteFeed, listFeed } from "../controller";
import { addFeedsToUserSchema, createFeedSchema, deleteFeedSchema } from "../schema";
import authenticate from "../../../shared/middlewares/authenticate";
import { addFeedsToUser } from "../controller/addFeedsToUser";

const router = Router();

router.post(
  "/create",
  authenticate,
  controllerHandler({
    schema: createFeedSchema,
    controller: createFeed,
    options: { transaction: true },
  })
);


router.post(
  "/add/user",
  authenticate,
  controllerHandler({
    schema: addFeedsToUserSchema,
    controller: addFeedsToUser,
    options: { transaction: true },
  })
);

router.get(
  "/list",
  authenticate,
  controllerHandler({
    controller: listFeed,
    options: { transaction: false },
  })
);

router.delete(
  "/delete",
  authenticate,
  controllerHandler({
    schema: deleteFeedSchema,
    controller: deleteFeed,
    options: { transaction: true },
  })
);

export const feedRouter = router;
