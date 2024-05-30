export declare type MaxSizeType = number | null;

export declare type OptionsType = {
  src: string;
  dist: string;
  width: MaxSizeType;
  height: MaxSizeType;
  json: string | null;
};

export declare type ImageType = {
  name: string;
  path: string;
  dist: string;
}

export declare type StructureJsonFileType = {
  type: 'file';
  name: string;
}

export declare type StructureJsonDirectoryType = {
  type: 'folder';
  name: string;
  children: StructureJsonType;
}

export declare type StructureJsonType = (StructureJsonDirectoryType | StructureJsonFileType)[];
