import db from '../db/connection.js';

export async function insertDocument({ id, fileName, filePath, mimeType, status }) {
  await db.execute(
    `INSERT INTO documents
      (id, file_name, file_path, mime_type, status, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [id, fileName, filePath, mimeType, status]
  );
}
