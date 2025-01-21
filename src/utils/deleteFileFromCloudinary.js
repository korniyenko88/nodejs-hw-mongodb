import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';

const cloud_name = getEnvVar('CLOUDINARY_CLOUD_NAME');
const api_key = getEnvVar('CLOUDINARY_API_KEY');
const api_secret = getEnvVar('CLOUDINARY_API_SECRET');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export const deleteFileFromCloudinary = async (fileUrl) => {
  console.log('Cloudinary URL:', fileUrl);

  const parts = fileUrl.split('/image/upload/')[1];
  const publicId = parts
    .split('/')
    .slice(1)
    .join('/')
    .split('.')
    .slice(0, -1)
    .join('.');

  console.log('Public Id:', publicId);

  if (publicId) {
    
      const result = await cloudinary.v2.uploader.destroy(publicId);
      console.log('Cloudinary delete result:', result);
      return result;
    
  }
};
