#!/usr/bin/env node
import { existsSync } from 'node:fs';
import inquirer from 'inquirer';
import { toJson } from './modules/to-json.js';
import { getPath } from './modules/get-path.js';
import { scanner } from './modules/scanner.js';
import { recreateDist } from './modules/recreate-dist.js';
import type { OptionsType, FormatType } from '../types/index.js';

const defaultFormat = 'webp';
const formats: FormatType[] = ['original', defaultFormat, 'jpg', 'png', 'avif', 'tiff', 'gif'];

const prompt = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'src',
      message: 'Source catalog with photos',
      default: 'img-src',
      validate: (value: string) => {
        const isExist = existsSync(value);
        if (!isExist) console.warn('\x1b[31m', `\n"${value}" directory not found!`, '\x1b[0m');
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
      choices: formats.map((format: FormatType) => ({
        name: format,
        value: format,
      })),
      default: defaultFormat,
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
  format: defaultFormat,
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
        const format = value as FormatType;
        if (formats.includes(format)) params[param] = value;
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

    if (existsSync(answers.dist)) {
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'confirmOverwrite',
            message: `The "${answers.dist}" folder already exists. Do you want to overwrite it?`,
            default: false,
          },
        ])
        .then(({ confirmOverwrite }) => {
          if (confirmOverwrite) start().then(console.info);
          else console.warn('\x1b[31m', `Process termination.`, '\x1b[0m');
        });
    } else {
      start().then(console.info);
    }
  });
}

async function start() {
  const settings: Readonly<OptionsType> = {
    ...options,
    ...params,
  };

  if (!existsSync(settings.src)) {
    console.warn('\x1b[31m', `"${settings.src}" directory not found!`, '\x1b[0m');
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
