// Cloudinary Upload Service
// Configuration loaded from environment variables (.env.local)

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'drmkqzgsj';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'dofornoaoaltar_products';

/**
 * Upload an image file to Cloudinary
 * @param file - The image file to upload
 * @returns Promise with the secure URL of the uploaded image
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  try {
    console.log('🔍 Iniciando upload do Cloudinary...');
    console.log('Cloud Name:', CLOUDINARY_CLOUD_NAME);
    console.log('Upload Preset:', CLOUDINARY_UPLOAD_PRESET);
    console.log('Arquivo:', file.name, 'Tamanho:', file.size, 'Tipo:', file.type);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'dofornoaoaltar/produtos');
    formData.append('resource_type', 'auto');

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    console.log('URL de upload:', uploadUrl);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    console.log('Status de resposta:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erro do Cloudinary:', errorData);
      throw new Error(`Cloudinary upload failed: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('✅ Upload bem-sucedido! URL:', data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('❌ Erro ao fazer upload para Cloudinary:', error);
    throw error;
  }
};

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 */
export const deleteImageFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    // Note: This requires a signed request with API key/secret
    // For now, deletion should be handled server-side or through Cloudinary dashboard
    console.log(`Image deletion for ${publicId} should be handled server-side`);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

/**
 * Extract public ID from a Cloudinary URL
 * @param url - The Cloudinary URL
 * @returns The public ID
 */
export const extractPublicIdFromUrl = (url: string): string => {
  try {
    const match = url.match(/\/([^/]+)\/upload\/(?:v\d+\/)?(.+)(?:\.\w+)?$/);
    return match ? match[2] : '';
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return '';
  }
};
