import express from "express";
import { upload } from "../config/aws.js";
import { postUploadImage } from "../controllers/upload.js";
var router = express.Router();

/* GET users listing. */
router.post("/image", upload.single("file"), postUploadImage);

export default router;