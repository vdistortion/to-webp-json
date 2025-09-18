import { sep } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import isImage from 'is-image';
import pLimit from 'p-limit';
import { SingleBar, Presets } from 'cli-progress';
import { getPath } from './get-path.js';
import { imageProcessing } from './image-processing.js';
import type { ImageType, MaxSizeType } from '../../types/index.ts';

export const scanner = (
  initPath: string,
  dirSrc: string,
  dirDist: string,
  maxWidth: MaxSizeType,
  maxHeight: MaxSizeType,
  format: string,
  concurrency: number,
) => {
  return readdir(initPath).then((files) => {
    const bar = new SingleBar({}, Presets.rect);
    const limit = pLimit(concurrency);
    let done = 0;
    bar.start(files.length, 0);

    const promises = files.map((file) =>
      limit(() => {
        const newPath = getPath(initPath, file);

        return stat(newPath).then((stats) => {
          if (stats.isDirectory())
            return scanner(newPath, dirSrc, dirDist, maxWidth, maxHeight, format, concurrency);
          else if (isImage(file)) {
            const distPath = newPath.replace(dirSrc, dirDist).split(sep).slice(0, -1);
            const image: ImageType = {
              name: file,
              path: newPath,
              dist: getPath(...distPath),
            };
            return imageProcessing(image, maxWidth, maxHeight, format).then(() => {
              done++;
              bar.update(done);
            });
          } else return Promise.resolve();
        });
      }),
    );
    return Promise.all(promises).then(() => bar.stop());
  });
};
