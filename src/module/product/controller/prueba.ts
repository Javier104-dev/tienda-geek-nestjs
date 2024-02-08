import { InternalServerErrorException } from '@nestjs/common';

export const renameImage = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileName = file.originalname;
  const newName = `${name}-${Date.now()}-${fileName}`;
  callback(null, newName);
};

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new InternalServerErrorException('Invalid format type'),
      false,
    );
  }

  callback(null, true);
};
