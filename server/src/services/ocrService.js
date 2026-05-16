import fs from "fs/promises";
import path from "path";
import Tesseract from "tesseract.js";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".tif", ".webp"]);

export const extractText = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".txt") {
    return await fs.readFile(filePath, "utf8");
  }

  if (IMAGE_EXTS.has(ext)) {
    const { data } = await Tesseract.recognize(filePath, "eng");
    return data.text;
  }

  throw new Error(`Unsupported file type: ${ext}`);
};
