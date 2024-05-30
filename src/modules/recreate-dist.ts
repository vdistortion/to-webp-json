import { resolve } from 'node:path';
import { rm, mkdir } from 'node:fs/promises';

export const recreateDist = async (dirName: string) => {
  const fullPath = resolve(dirName);
  return rm(fullPath, { recursive: true })
    .catch(() => Promise.resolve())
    .then(() => mkdir(fullPath));
};
