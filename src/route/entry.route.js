import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createEntry } from "../controller/entry.controller.js";
const router = Router();

router.route("/create").post(authMiddleware, createEntry);

export default router;
