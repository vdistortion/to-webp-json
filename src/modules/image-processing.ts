import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp, { Metadata, Sharp } from 'sharp';
import { getPath } from '@/modules/get-path.js';
import { ImageType, MaxSizeType } from '../../index.js';

function getName(fullName: string) {
  const [name] = fullName.split('.');
  return `${name}.webp`;
}

export const imageProcessing = (image: ImageType, maxWidth: MaxSizeType, maxHeight: MaxSizeType) => {
  const fullPath = getPath(resolve(image.dist), getName(image.name));

  fs.mkdir(image.dist, { recursive: true }).then(() => {
    sharp.cache(false);
    const input: Sharp = sharp(image.path);

    input.metadata().then((metadata: Metadata) => {
      const width = Number(metadata.width) > Number(maxWidth) ? Number(maxWidth) : Number(metadata.width);
      const height = Number(metadata.height) > Number(maxHeight) ? Number(maxHeight) : Number(metadata.height);
      return input.resize(width, height, { fit: 'inside' }).toFile(fullPath);
    });
  });
};
