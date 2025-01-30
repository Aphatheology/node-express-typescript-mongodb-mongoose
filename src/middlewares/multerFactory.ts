import multer from 'multer';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';

export const multerFactory = ({
  allowedFormats,
  maxFileSize,
}: {
  allowedFormats: string[];
  maxFileSize: number;
}) => {
  const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(StatusCodes.BAD_REQUEST, `Invalid file format. Allowed formats: ${allowedFormats.join(', ')}`));
    }
  };

  return multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
      fileSize: maxFileSize,
    },
  });
};

