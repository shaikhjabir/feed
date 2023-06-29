import { Router } from "express";
import { controllerHandler } from "../../../shared/lib/controllerHandler";
import { createFeed } from "../controller";
import { createFeedSchema } from "../schema";
import authenticate from "../../../shared/middlewares/authenticate";

const router = Router();

router.post(
  "/create",
  authenticate,
  controllerHandler({
    schema: createFeedSchema,
    controller: createFeed,
    options: { transaction: false },
  })
);

export const userRouter = router;
