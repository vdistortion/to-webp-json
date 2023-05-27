# to-webp
### Usage
Create ```src``` folder
```shell
mkdir src
```
Add images to ```src```
```shell
npm run to-webp
```
### Command line options
| Param      | Type    | Description                                    | Default   |
|------------|---------|------------------------------------------------|-----------|
| no-json    | boolean | Whether to generate a structure in a json file | false     |
| name-json  | string  | Structure file name                            | structure |
| src        | string  | Source folder name                             | src       |
| dist       | string  | Result folder name                             | dist      |
| max-width  | number  | Maximum image width in pixels                  | 1500      |
| max-height | number  | Maximum image height in pixels                 | 1500      |
### Examples
```shell
npm run to-webp no-json src=sources
npm run to-webp name-json=static-images max-height=2000
```
