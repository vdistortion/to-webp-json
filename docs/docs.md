# to-webp-json

![to-webp-json](bg.jpg)

A CLI tool that converts images to the desired format, generates a structured JSON map of the output files, and optionally resizes them by width and/or height. Useful for static sites, galleries, and automation.

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

| Option      | Type           | Description                                                                | Default  |
| ----------- | -------------- | -------------------------------------------------------------------------- | -------- |
| src         | string         | Source folder name                                                         | img-src  |
| dist        | string         | Result folder name                                                         | img-dist |
| format      | string         | Output format: `webp`, `jpg`, `png`, `avif`, or keep original (`original`) | webp     |
| json        | string \| null | Output JSON filename (or `null` to skip)                                   | null     |
| width       | number \| null | Maximum image width in pixels                                              | null     |
| height      | number \| null | Maximum image height in pixels                                             | null     |
| concurrency | number         | Maximum number of concurrent image processing tasks                        | 5        |

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
