import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import createHttpError from 'http-errors';

import { UPLOADS_DIR } from '../constants/index.js';

export const deleteFileFromUploadsDir = async (filename) => {
  const filePath = path.join(UPLOADS_DIR, filename);

  try {
    await fs.unlink(filePath);
    return `File ${filename} has been deleted successfully.`;
  } catch (error) {
    throw createHttpError(400, `Could not delete file: ${filename}`);
  }
};
