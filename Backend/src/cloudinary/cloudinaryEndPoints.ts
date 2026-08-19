import cloudinary from "./config";

export const uploadImage = async (imagePath:any) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMediaFromCloudinary = async (publicId:any) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId,{
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};