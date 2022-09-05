import { getImage, uploadImage } from "../controllers/upload.controller";

import { Router } from "express";

const router = Router();

router.get("/:key", getImage);
router.post("/upload", uploadImage);
router.post("/upload", uploadImage);

export default router;
