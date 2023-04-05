const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const dirSrc = 'src';
const dirDist = 'dist';
const fullPathSrc = path.resolve(`./${dirSrc}/`);
const fullPathDist = path.resolve(`./${dirDist}/`);

function scaner(initPath) {
  const list = fs.readdirSync(initPath);

  for (let item of list) {
    const newPath = initPath + item;
    const stat = fs.statSync(newPath);

    if (stat.isDirectory()) {
      scaner(newPath + path.sep);
    } else {
      const image = {
        name: item.split('.')[0],
        path: newPath,
        dist: newPath.replace(dirSrc, dirDist).split(path.sep).slice(0, -1).join(path.sep),
      };
      const fullPath = [path.resolve(image.dist), `${image.name[0] === '_' ? `io${image.name}` : image.name}.webp`].join(path.sep);
      console.log(image, fullPath);

      if (!fs.existsSync(image.dist)) {
          fs.mkdirSync(image.dist, {
            recursive: true,
          });
      }
      const input = sharp(newPath);

      input
        .metadata()
        .then((metadata) => {
          const width = metadata.width > 1500 ? 1500 : metadata.width;
          const height = metadata.height > 1500 ? 1500 : metadata.height;

          input.resize(width, height, {
            fit: 'inside',
          })
          .toFile(fullPath);
        });
    }
  }
}

fs.rmSync(fullPathDist, { recursive: true, force: true });
scaner(`./${dirSrc}/`);
