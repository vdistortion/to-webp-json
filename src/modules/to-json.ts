import fs from 'node:fs';
import isImage from 'is-image';
import { getStructure, traverseStructure } from 'directory-structure-json';
import { getPath } from '@/modules/get-path.js';
import { StructureJsonType, StructureJsonFileType } from '../../types/index.js';

export const toJson = (jsonName: string, basePath: string) =>
  new Promise((resolve, reject) => {
    getStructure(fs, basePath, (error: Error, structure: StructureJsonType) => {
      if (error) reject(error);

      const list: string[] = [];
      const imageFilter = (_key: string, value: StructureJsonType) => {
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

      if (structure) {
        traverseStructure(
          structure,
          '.',
          () => {},
          (file: StructureJsonFileType, path: string) => {
            const fullPath = getPath(path, file.name);
            list.push(fullPath);
          },
        );
      }

      fs.writeFile(jsonName, json, (err) => {
        if (err) reject(err);
        resolve(list);
      });
    });
  });
