import { v4 as uuidv4 } from 'uuid';
import { insertDocument } from '../models/documentModel.js';

export const uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const documentId = 'doc_' + uuidv4();

    await insertDocument({
      id: documentId,
      fileName: file.originalname,
      filePath: file.path,
      mimeType: file.mimetype,
      status: 'uploaded',
    });

    res.status(201).json({
      id: documentId,
      fileName: file.originalname,
      status: 'uploaded',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
};
