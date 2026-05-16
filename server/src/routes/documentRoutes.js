import express from "express";
import multer from "multer";
import path from "path";
import { uploadDocument } from "../controllers/documentController.js";
import { processController } from "../controllers/processController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + ext);
  },
});

const ALLOWED_EXTS = /\.(png|jpe?g|bmp|pbm|tiff?|webp|txt)$/i;

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ok = ALLOWED_EXTS.test(file.originalname);
    cb(ok ? null : new Error("Unsupported file type"), ok);
  },
});

router.post("/upload", upload.single("file"), uploadDocument);
router.post("/:id/process", processController);

export default router;
