import { sep } from 'node:path';

export const getPath = (...args: string[]) => args.join(sep);
