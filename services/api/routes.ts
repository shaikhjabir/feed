import { Router } from "express";
import { userRouter } from "../user/api";

const router = Router();
router.use("/user", userRouter);

export default router;
