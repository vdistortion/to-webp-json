import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp, { Metadata, Sharp } from 'sharp';
import { getPath } from './get-path.js';
import type { ImageType, MaxSizeType } from '../../types/index.ts';

function getName(fullName: string, format: string) {
  if (format === 'original') return fullName;
  const [name] = fullName.split('.');
  return `${name}.${format}`;
}

export const imageProcessing = (
  image: ImageType,
  maxWidth: MaxSizeType,
  maxHeight: MaxSizeType,
  format: string,
) => {
  const fullPath = getPath(resolve(image.dist), getName(image.name, format));

  return fs.mkdir(image.dist, { recursive: true }).then(() => {
    sharp.cache(false);
    const input: Sharp = sharp(image.path, {
      animated: true,
      limitInputPixels: false,
    });

    return input.metadata().then((metadata: Metadata) => {
      const width = Number(metadata.width) > Number(maxWidth) ? maxWidth : null;
      const height = Number(metadata.height) > Number(maxHeight) ? maxHeight : null;
      console.info(`\x1b[34m`, `${image.path}`, '\x1b[33m', 'processing...', '\x1b[0m');
      return input.resize(width, height, { fit: 'inside' }).toFile(fullPath);
    });
  });
};
