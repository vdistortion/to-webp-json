export declare type MaxSizeType = number | null;

export declare type FormatType = 'original' | 'webp' | 'jpg' | 'png' | 'avif' | 'tiff' | 'gif';

export declare type OptionsType = {
  src: string;
  dist: string;
  width: MaxSizeType;
  height: MaxSizeType;
  format: FormatType;
  json: string | null;
};

export declare type ImageType = {
  name: string;
  path: string;
  dist: string;
};
