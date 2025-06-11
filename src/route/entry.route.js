import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createEntry,getAllEntry,getEntry } from "../controller/entry.controller.js";
const router = Router();
router.use(authMiddleware)
router.route("/create").post(createEntry);
router.route("/all").get(getAllEntry);
router.route('/:id').get(getEntry)


export default router;
