import fs from 'node:fs';

declare module 'directory-structure-json' {
  export interface File {
    name: string;
    type: 'file';
  }

  export interface Folder {
    name: string;
    type: 'folder';
    children: Array<File | Folder>;
  }

  export interface Total {
    files: number;
    folders: number;
  }

  export function getStructure(
    fs: fs,
    dir: string,
    callback: (err: Error | null, result?: Folder, total?: Total) => void,
  ): void;

  export function traverseStructure(
    structure: Array<File | Folder>,
    basepath: string,
    onFolderFound: (folder: Folder, basepath: string) => void,
    onFileFound: (file: File, basepath: string) => void,
  ): void;
}
