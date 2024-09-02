import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "@/utils/cloudinary/cloudinary";
import { unlink,writeFile } from "fs/promises";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("profileImage");
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);

  const filePath = `./public/uploads/${file.name}`;
  // Saving in the public/uploads folder
  await writeFile(filePath, buffer);
  
  //uploading to cloudinary
  const profileImageUrl = await uploadOnCloudinary(filePath);

  // Delete the file from the uploads folder after successful upload to Cloudinary
  await unlink(filePath);

  return Response.json({
    message: "file received",
    profileImageUrl: profileImageUrl,
  });
}
