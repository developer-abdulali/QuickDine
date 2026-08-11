import { v2 as cloudinary } from "cloudinary";

const uploadToCloudinary = async (fileBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "QuickDine" },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));
        resolve({ secure_url: result.secure_url });
      },
    );

    stream.end(fileBuffer);
  });
};

export default uploadToCloudinary;
