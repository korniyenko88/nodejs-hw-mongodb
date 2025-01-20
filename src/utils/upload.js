import multer from 'multer';
import createError from 'http-errors';

import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  // destination: (req, file, cb)=> {
  //     // cb(new Error("Cannot upload file"));
  //     cb(null, TEMP_UPLOAD_DIR);
  // }
  destination: TEMP_UPLOAD_DIR,
  filename: (req, file, cb) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split('.').pop();
  if (extention === 'exe') {
    return cb(createError(400, 'file with .exe extention not allow'));
  }
  cb(null, true);
};
export const upload = multer({
  storage,
  fileFilter,
});
