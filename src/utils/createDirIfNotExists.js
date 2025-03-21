import { access, mkdir } from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
  try {
    await access(url);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdir(url);
    }
  }
};
