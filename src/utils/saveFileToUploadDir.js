import path from 'node:path';
import { rename } from 'node:fs/promises';

import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  await rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};
