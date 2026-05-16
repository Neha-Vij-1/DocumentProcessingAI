import { getDocumentById, updateExtractedText } from "../models/documentModel.js";
import { extractText } from "../services/ocrService.js";

export const processController = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await getDocumentById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    const extractedText = await extractText(document.file_path);
    await updateExtractedText(id, extractedText);

    res.json({ id, extractedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OCR processing failed" });
  }
};
