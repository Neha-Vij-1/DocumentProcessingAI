import Tesseract from "tesseract.js";

export const extractText = async (filePath) => {
  const { data } = await Tesseract.recognize(filePath, "eng");
  return data.text;
};