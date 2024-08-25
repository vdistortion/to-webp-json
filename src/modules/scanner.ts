import { sep } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import isImage from 'is-image';
import { getPath } from './get-path.js';
import { imageProcessing } from './image-processing.js';
import type { ImageType, MaxSizeType } from '../../types/index.js';

export const scanner = (
  initPath: string,
  dirSrc: string,
  dirDist: string,
  maxWidth: MaxSizeType,
  maxHeight: MaxSizeType,
  format: string,
) => {
  return readdir(initPath).then((files) => {
    const promises = files.map((file) => {
      const newPath = getPath(initPath, file);

      return stat(newPath).then((stats) => {
        if (stats.isDirectory())
          return scanner(newPath, dirSrc, dirDist, maxWidth, maxHeight, format);
        else if (isImage(file)) {
          const distPath = newPath.replace(dirSrc, dirDist).split(sep).slice(0, -1);
          const image: ImageType = {
            name: file,
            path: newPath,
            dist: getPath(...distPath),
          };
          return imageProcessing(image, maxWidth, maxHeight, format);
        } else return Promise.resolve();
      });
    });
    return Promise.all(promises);
  });
};
