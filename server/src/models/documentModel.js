import db from '../db/connection.js';

export async function insertDocument({ id, fileName, filePath, mimeType, status }) {
  await db.execute(
    `INSERT INTO documents
      (id, file_name, file_path, mime_type, status, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [id, fileName, filePath, mimeType, status]
  );
}

export async function getDocumentById(id) {
  const [rows] = await db.execute(
    `SELECT * FROM documents WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

export async function updateExtractedText(id, extractedText) {
  await db.execute(
    `UPDATE documents SET extracted_text = ? WHERE id = ?`,
    [extractedText, id]
  );
}
