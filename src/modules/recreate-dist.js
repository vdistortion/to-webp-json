import path from 'path';
import fs from 'node:fs/promises';

export const recreateDist = async (dirName) => {
  const fullPath = path.resolve(dirName);
  return fs.rm(fullPath, { recursive: true })
    .catch(() => Promise.resolve())
    .then(() => fs.mkdir(fullPath));
};
