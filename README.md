# to-webp-json
### Usage
Create ```img-src``` folder
```shell
mkdir img-src
```
Add images to ```img-src```
```shell
npm run to-webp
```
### Command line options
| Param  | Type           | Description                    | Default  |
|--------|----------------|--------------------------------|----------|
| src    | string         | Source folder name             | img-src  |
| dist   | string         | Result folder name             | img-dist |
| json   | string \| null | Structure file name            | null     |
| width  | number \| null | Maximum image width in pixels  | null     |
| height | number \| null | Maximum image height in pixels | null     |
### Examples
```shell
npm run to-webp json=static-images
```
```shell
npm run to-webp src=sources height=2000
```
