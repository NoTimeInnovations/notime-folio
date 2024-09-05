import cloudinary from 'cloudinary'

cloudinary.config({ 
    cloud_name:  process.env.NEXT_PUBLIC_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_API_KEY, 
    api_secret:  process.env.NEXT_PUBLIC_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath)=>{
    try {
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("profile image uploaded")
        return response.url;
    } catch (error) {
        console.log("profile image upload failed\n",error)
    }
}

export const deleteFromCloudinary = async (imgName)=>{
    try {
        const response=await cloudinary.uploader.destroy(imgName)
        console.log("old profile image deleted")
    } catch (error) {
        console.log("old profile image deletion failed\n",error)
    }
}