# to-webp-json

[![NPM Version](https://img.shields.io/npm/v/to-webp-json?style=flat&logo=npm&label=version&color=cb3837)](https://www.npmjs.com/package/to-webp-json)
[![GitHub Created At](https://img.shields.io/github/created-at/vdistortion/to-webp-json?style=flat&logo=github)](https://github.com/vdistortion/to-webp-json)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/vdistortion/to-webp-json)

[![to-webp-json](docs/bg.jpg)](https://vdistortion.github.io/to-webp-json/)

A CLI tool that converts images to the desired format (`webp`, `jpg`, `png`, etc.), generates a structured JSON map of the output files, and optionally resizes them by width and/or height. Useful for static sites, galleries, and automation.

## Usage

Create an `img-src` folder

```shell
mkdir img-src
```

Place images inside `img-src`

```shell
npx to-webp-json@latest
```

## Command-line options

| Option | Type           | Description                                                | Default  |
| ------ | -------------- | ---------------------------------------------------------- | -------- |
| src    | string         | Source folder name                                         | img-src  |
| dist   | string         | Result folder name                                         | img-dist |
| format | string         | Output format: webp, jpg, png, avif, tiff, gif or original | webp     |
| json   | string \| null | Output JSON filename (or null to skip)                     | null     |
| width  | number \| null | Maximum image width in pixels                              | null     |
| height | number \| null | Maximum image height in pixels                             | null     |

## Examples

```shell
npx to-webp-json json=static-images format=original
```

```shell
npx to-webp-json src=sources height=2000
```

Run with no arguments (interactive mode)

```shell
npx to-webp-json
```
