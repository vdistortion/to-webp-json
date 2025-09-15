# to-webp-json

![to-webp-json](../bg.jpg)

Инструмент командной строки, который конвертирует изображения в нужный формат (`webp`, `jpg`, `png` и др.), генерирует структуру файлов в формате JSON и при необходимости изменяет размеры. Полезен для статических сайтов, галерей и автоматизации.

## Использование

Создайте папку `img-src`

```shell
mkdir img-src
```

Поместите изображения в `img-src`

```shell
npx to-webp-json@latest
```

## Параметры командной строки

| Параметр | Тип            | Описание                                              | По умолчанию |
| -------- | -------------- | ----------------------------------------------------- | ------------ |
| src      | string         | Имя исходной папки                                    | img-src      |
| dist     | string         | Имя папки с результатами                              | img-dist     |
| format   | string         | Выходной формат: webp, jpg, png, avif или оригинал    | webp         |
| json     | string \| null | Имя выходного JSON-файла (или null, чтобы пропустить) | null         |
| width    | number \| null | Максимальная ширина изображения в пикселях            | null         |
| height   | number \| null | Максимальная высота изображения в пикселях            | null         |

## Примеры

```shell
npx to-webp-json json=static-images format=original
```

```shell
npx to-webp-json src=sources height=2000
```

Запуск без аргументов (интерактивный режим)

```shell
npx to-webp-json
```
