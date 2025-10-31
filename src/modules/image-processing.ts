import fs from 'node:fs/promises';
import { parse, resolve } from 'node:path';
import sharp, { Metadata, Sharp } from 'sharp';
import { getPath } from './get-path.js';
import type { FormatType, ImageType, MaxSizeType } from '../../types/index.ts';

function getName(fullName: string, format: string) {
  if (format === 'original') return fullName;
  const { name } = parse(fullName);
  return `${name}.${format}`;
}

export const imageProcessing = (
  image: ImageType,
  maxWidth: MaxSizeType,
  maxHeight: MaxSizeType,
  format: FormatType,
) => {
  const fullPath = getPath(resolve(image.dist), getName(image.name, format));

  return fs.mkdir(image.dist, { recursive: true }).then(() => {
    sharp.cache(false);
    const input: Sharp = sharp(image.path, {
      animated: true,
      limitInputPixels: false,
    });

    return input.metadata().then((metadata: Metadata) => {
      const currentWidth = metadata.width ?? null;
      const currentHeight = metadata.height ?? null;
      const width =
        typeof maxWidth === 'number' && currentWidth && currentWidth > maxWidth ? maxWidth : null;
      const height =
        typeof maxHeight === 'number' && currentHeight && currentHeight > maxHeight
          ? maxHeight
          : null;
      return input.resize(width, height, { fit: 'inside' }).toFile(fullPath);
    });
  });
};
