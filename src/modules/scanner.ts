import { sep } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import isImage from 'is-image';
import { getPath } from '@/modules/get-path.js';
import { imageProcessing } from '@/modules/image-processing.js';
import { ImageType, MaxSizeType } from '../../index.js';

export const scanner = (initPath: string, dirSrc: string, dirDist: string, maxWidth: MaxSizeType, maxHeight: MaxSizeType) => {
  readdir(initPath).then((files) => {
    files.forEach((file) => {
      const newPath = getPath(initPath, file);

      stat(newPath).then((stats) => {
        if (stats.isDirectory()) scanner(newPath, dirSrc, dirDist, maxWidth, maxHeight);

        if (isImage(file)) {
          const distPath = newPath.replace(dirSrc, dirDist).split(sep).slice(0, -1);
          const image: ImageType = {
            name: file,
            path: newPath,
            dist: getPath(...distPath),
          };
          imageProcessing(image, maxWidth, maxHeight);
        }
      });
    });
  });
};
