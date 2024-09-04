import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "@/utils/cloudinary/cloudinary";
import { unlink, writeFile } from "fs/promises";

export async function POST(req) {
  const userDetails = await req.json();
  // console.log(userDetails);

  let profileImageUrl;
  if (userDetails.filePath) {
    //uploading to cloudinary
    profileImageUrl = await uploadOnCloudinary(
      `./public/${userDetails.filePath}`
    );
    
    // Delete the file from the uploads folder after successful upload to Cloudinary
    await unlink(`./public/${userDetails.filePath}`);
  }

  return Response.json({ userDetails, profileImageUrl });
}
