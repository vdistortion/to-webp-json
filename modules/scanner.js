import path from 'path';
import fs from 'node:fs/promises';
import isImage from 'is-image';
import { getPath } from './get-path';
import { imageProcessing } from './image-processing';

export const scanner = (initPath, dirSrc, dirDist, maxSize) => {
  fs.readdir(initPath).then((files) => {
    files.forEach((file) => {
      const newPath = getPath(initPath, file);

      fs.stat(newPath).then((stats) => {
        if (stats.isDirectory()) scanner(newPath, dirSrc, dirDist, maxSize);

        if (isImage(file)) {
          const distPath = newPath.replace(dirSrc, dirDist).split(path.sep).slice(0, -1);
          const image = {
            name: file,
            path: newPath,
            dist: getPath(...distPath),
          };
          imageProcessing(image, maxSize);
        }
      });
    });
  });
};
