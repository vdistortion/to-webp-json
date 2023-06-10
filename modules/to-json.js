import fs from 'node:fs';
import isImage from 'is-image';
import DirectoryStructureJSON from 'directory-structure-json';
import { getPath } from './get-path';

export const toJson = (jsonName, basePath = 'dist') => new Promise((resolve, reject) => {
  DirectoryStructureJSON.getStructure(fs, basePath, (error, structure) => {
    if (error) reject(error);

    const list = [];
    const imageFilter = (key, value) => {
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

    DirectoryStructureJSON.traverseStructure(structure, '.', () => {}, (file, path) => {
      list.push(getPath(path, file.name));
    });

    fs.writeFile(jsonName, json, (err) => {
      if (err) reject(err);
      resolve(list);
    });
  });
});
