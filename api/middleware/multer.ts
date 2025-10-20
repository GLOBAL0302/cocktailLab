import multer from 'multer';
import path from 'path';
import { config } from '../config';
import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const directory = path.join(config.publickPath, 'images');
    await fs.mkdir(directory, { recursive: true });
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const ex = path.extname(file.filename);
    cb(null, '/' + randomUUID() + ex);
  },
});

export const upload = multer({ storage: storage });
