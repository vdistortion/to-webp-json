#!/usr/bin/env node
import { existsSync } from 'node:fs';
import inquirer from 'inquirer';
import { toJson } from './modules/to-json.js';
import { getPath } from './modules/get-path.js';
import { scanner } from './modules/scanner.js';
import { recreateDist } from './modules/recreate-dist.js';
import { OptionsType } from '../types/index.js';

const prompt = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'src',
      message: 'Source catalog with photos',
      default: 'img-src',
      validate: (value: string) => {
        const isExist = existsSync(value);
        if (!isExist) console.warn(`\n${value} directory not found!`);
        return isExist;
      },
    },
    {
      type: 'input',
      name: 'dist',
      message: 'Final catalog',
      default: 'img-dist',
    },
    {
      type: 'list',
      name: 'format',
      message: 'Image format',
      choices: [
        {
          name: 'original',
          value: 'original',
        },
        {
          name: 'webp',
          value: 'webp',
        },
        {
          name: 'jpg',
          value: 'jpg',
        },
        {
          name: 'png',
          value: 'png',
        },
      ],
      default: 'webp',
    },
    {
      type: 'number',
      name: 'width',
      message: 'Maximum width',
      default: null,
    },
    {
      type: 'number',
      name: 'height',
      message: 'Maximum height',
      default: null,
    },
    {
      type: 'confirm',
      name: 'isJson',
      message: 'Should I generate a JSON file?',
      default: false,
    },
    {
      type: 'input',
      name: 'json',
      message: 'JSON file name',
      default: 'structure',
      when(args) {
        return args.isJson;
      },
    },
  ]);

const options: Readonly<OptionsType> = {
  src: 'img-src',
  dist: 'img-dist',
  format: 'webp',
  width: null,
  height: null,
  json: null,
};

const args: string[] = process.argv.slice(2);

const params: Partial<OptionsType> = {};

if (args.length) {
  args.forEach((arg: string) => {
    const [param, value]: any[] = arg.split('=');
    const isValidValue = typeof value === 'string' && Boolean(value.length);
    const isValidParam = Object.keys(options).includes(param);

    if (isValidValue && isValidParam) {
      if (['width', 'height'].includes(param)) {
        if (Number(value) >= 100) params[param] = Number(value);
      } else if (param === 'format') {
        if (['webp', 'jpg', 'png', 'original'].includes(value)) params[param] = value;
      } else {
        params[param] = value;
      }
    }
  }, {});

  start().then(console.info);
} else {
  prompt().then((answers) => {
    params.src = answers.src;
    params.dist = answers.dist;
    params.format = answers.format;
    if (answers.isJson) params.json = answers.json;
    if (answers.width > 0) params.width = answers.width;
    if (answers.height > 0) params.height = answers.height;

    start().then(console.info);
  });
}

async function start() {
  const settings: Readonly<OptionsType> = {
    ...options,
    ...params,
  };

  if (!existsSync(settings.src)) {
    console.warn(`${settings.src} directory not found!`);
  } else {
    await recreateDist(settings.dist);
    await scanner(
      settings.src,
      settings.src,
      settings.dist,
      settings.width,
      settings.height,
      settings.format,
    );

    if (settings.json) {
      const nameJson = getPath(settings.dist, `${settings.json}.json`);
      toJson(nameJson, settings.dist).then(() => console.info(`File ./${nameJson} generated!`));
    }
  }

  return 'Finished successfully!';
}
