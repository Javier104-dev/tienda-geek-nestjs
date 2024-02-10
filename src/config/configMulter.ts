import { InternalServerErrorException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

const renameImage = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileName}`);
};

const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new InternalServerErrorException('Invalid format type'),
      false,
    );
  }

  callback(null, true);
};

export const multerOptions = () => {
  return {
    storage: diskStorage({
      destination: './prueba',
      filename: renameImage,
    }),
    fileFilter: fileFilter,
  };
};
