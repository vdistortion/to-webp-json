import { toJson } from './modules/to-json';
import { getPath } from './modules/get-path';
import { scanner } from './modules/scanner';
import { recreateDist } from './modules/recreate-dist';

const options = {
  src: 'src',
  dist: 'dist',
  max: {
    width: 1500,
    height: 1500,
  },
  nameJson: 'structure',
  noJson: false,
};

process.argv.slice(2).forEach((arg) => {
  const [param, value] = arg.split('=');
  if (param === 'no-json') options.noJson = true;
  if (param === 'name-json') options.nameJson = value;
  if (param === 'src') options.src = value;
  if (param === 'dist') options.dist = value;
  if (param === 'max-width') options.max.width = Number(value);
  if (param === 'max-height') options.max.height = Number(value);
});

recreateDist(options.dist).then(() => {
  scanner(options.src, options.src, options.dist, options.max);
  return options.noJson
    ? Promise.resolve()
    : toJson(getPath(options.dist, `${options.nameJson}.json`), options.src);
});
