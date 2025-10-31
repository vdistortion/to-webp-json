import fs from 'node:fs';
import isImage from 'is-image';
import { getStructure, traverseStructure, type File, type Folder } from 'directory-structure-json';
import { getPath } from './get-path.js';

export const toJson = (jsonName: string, basePath: string) =>
  new Promise((resolve, reject) => {
    getStructure(
      fs,
      basePath,
      (error: Error | null, structure: Folder | Array<File | Folder> | undefined) => {
        if (error) {
          reject(error);
          return;
        }

        const list: string[] = [];
        const imageFilter = (_: string, value: Folder | Array<File | Folder>) => {
          if (Array.isArray(value)) {
            return value.filter((item) => {
              const isFolder = item.type === 'folder';
              const isImageFile = item.type === 'file' && isImage(item.name);
              return isFolder || isImageFile;
            });
          }
          return value;
        };
        const json = JSON.stringify(structure, imageFilter, 2);

        if (Array.isArray(structure)) {
          traverseStructure(
            structure,
            '.',
            () => {},
            (file: File, path: string) => {
              const fullPath = getPath(path, file.name);
              list.push(fullPath);
            },
          );
        }

        fs.writeFile(jsonName, json, (err) => {
          if (err) reject(err);
          else resolve(list);
        });
      },
    );
  });
