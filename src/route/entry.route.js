import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createEntry,
  getAllEntry,
  getEntry,
  updateEntry,
  deleteEntry,
  getSummary,
} from "../controller/entry.controller.js";
import { validateEntry } from "../middleware/validateEntry.middleware.js";

const router = Router();

router.use(authMiddleware);

router.route("/create").post(validateEntry, createEntry);
router.route("/all").get(getAllEntry);
router.route("/:id").get(getEntry);
router.route("/edit/:id").put(validateEntry, updateEntry);
router.route("/delete/:id").delete(deleteEntry);
router.route("/summary").get(getSummary);

export default router;
