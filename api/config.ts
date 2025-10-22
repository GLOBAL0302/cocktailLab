import path from 'path';
import { configDotenv } from 'dotenv';

const rootpath = __dirname;

configDotenv();
export const config = {
  db: 'mongodb://localhost/cocktails',
  rootpath,
  publickPath: path.join(rootpath, 'public'),
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
