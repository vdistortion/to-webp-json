export declare type MaxSizeType = number | null;

export declare type FormatType = 'original' | 'webp' | 'jpg' | 'png' | 'avif';

export declare type OptionsType = {
  src: string;
  dist: string;
  width: MaxSizeType;
  height: MaxSizeType;
  format: FormatType;
  json: string | null;
  concurrency: number;
};

export declare type ImageType = {
  name: string;
  path: string;
  dist: string;
};
