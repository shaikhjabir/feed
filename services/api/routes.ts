import { Router } from "express";
import { userRouter } from "../user/api";
import { feedRouter } from "../feed/api";

const router = Router();
router.use("/user", userRouter);
router.use("/feed",feedRouter)

export default router;
