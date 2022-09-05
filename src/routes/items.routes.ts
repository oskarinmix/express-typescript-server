import {
  checkAuth,
  checkAuthWithSession,
} from "../middleware/checkAuth.middleware";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../controllers/items.controller";

import { Router } from "express";

const router = Router();
// router.use(checkAuthWithSession);
router.get("/", checkAuthWithSession, getItems);
router.get("/:id", checkAuth, getItemById);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
export default router;
