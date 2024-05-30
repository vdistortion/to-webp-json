#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { toJson } from '@/modules/to-json.js';
import { getPath } from '@/modules/get-path.js';
import { scanner } from '@/modules/scanner.js';
import { recreateDist } from '@/modules/recreate-dist.js';
import { OptionsType } from '../index.js';

const options: Readonly<OptionsType> = {
  src: 'img-src',
  dist: 'img-dist',
  width: null,
  height: null,
  json: null,
};

const errors: string[] = [];
const args: string[] = process.argv.slice(2);

const params: Partial<OptionsType> = args.reduce((acc: Partial<OptionsType>, arg: string) => {
  const [param, value]: any[] = arg.split('=');
  const isValidValue = typeof value === 'string' && Boolean(value.length);
  const isValidParam = Object.keys(options).includes(param);

  if (isValidValue && isValidParam) {
    if (['width', 'height'].includes(param)) {
      if (Number(value) >= 100) acc[param] = Number(value);
    } else {
      acc[param] = value;
    }
  }

  return acc;
}, {});

const settings: Readonly<OptionsType> = {
  ...options,
  ...params,
};

if (!existsSync(settings.src)) errors.push(`${settings.src} directory not found!`);

if (errors.length > 0) {
  console.warn(errors.join('\n'));
} else if (!settings.json) {
  recreateDist(settings.dist).then(() => {
    scanner(settings.src, settings.src, settings.dist, settings.width, settings.height);
  });
} else {
  const nameJson = getPath(settings.dist, `${settings.json}.json`);
  toJson(nameJson, settings.dist).then(() => {
    console.info(`File ./${nameJson} generated!`);
  });
}
