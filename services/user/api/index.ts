import { Router } from "express";
import { controllerHandler } from "../../../shared/lib/controllerHandler";
import { adminUpdateUser, createUser, loginUser } from "../controller";

import { createUserSchema, loginUserSchema, updateUserRoleAndPermissionSchema } from "../schema";
import authenticate from "../../../shared/middlewares/authenticate";

const router = Router();

router.post(
  "/login",
  controllerHandler({
    schema: loginUserSchema,
    controller: loginUser,
    options: { transaction: false },
  })
);

router.post(
  "/create",
  authenticate,
  controllerHandler({
    schema: createUserSchema,
    controller: createUser,
    options: { transaction: true },
  })
);


router.put(
  "/update/roleAndPermission",
  authenticate,
  controllerHandler({
    schema: updateUserRoleAndPermissionSchema,
    controller: adminUpdateUser,
    options: { transaction: true },
  })
);
export const userRouter = router;
