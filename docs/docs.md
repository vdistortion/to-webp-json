# to-webp-json

![to-webp-json](bg.jpg)

### Usage

Create `img-src` folder

```shell
mkdir img-src
```

Add images to `img-src`

```shell
npx to-webp-json@latest
```

### Command line options

| Param  | Type           | Description                                 | Default  |
| ------ | -------------- | ------------------------------------------- | -------- |
| src    | string         | Source folder name                          | img-src  |
| dist   | string         | Result folder name                          | img-dist |
| format | string         | webp, jpg, png, avif, tiff, gif or original | webp     |
| json   | string \| null | Structure file name                         | null     |
| width  | number \| null | Maximum image width in pixels               | null     |
| height | number \| null | Maximum image height in pixels              | null     |

### Examples

```shell
npx to-webp-json json=static-images format=original
```

```shell
npx to-webp-json src=sources height=2000
```

```shell
# no arguments interactive mode
npx to-webp-json
```
