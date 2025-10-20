import path, { join } from 'path';

const rootpath = __dirname;

export const config = {
  db: 'mongodb://localhost/cocktails',
  rootpath,
  publickPath: path.join(rootpath, 'public'),
};
