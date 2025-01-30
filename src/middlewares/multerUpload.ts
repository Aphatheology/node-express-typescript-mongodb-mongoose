import { multerFactory } from './multerFactory';

export const resumeUpload = multerFactory({
  allowedFormats: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  maxFileSize: 1 * 1024 * 1024,
});


export const imageUpload = multerFactory({
  allowedFormats: ['image/jpeg', 'image/png', 'image/jpg'],
  maxFileSize: 2 * 1024 * 1024, 
});
