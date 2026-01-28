import { V2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resourceType: "auto",
    });

    // file upload successful

    console.log("file upload successfull", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove file from locally save if upload operation got failed .
    return null;
  }
};

export { uploadOnCloudinary };
