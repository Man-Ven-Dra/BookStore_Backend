const cloudinary = require('cloudinary').v2
require('dotenv').config();

const connectCloudinary = async (imageURL) => {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET,
    });
    
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(imageURL, {
        public_id: Date.now()
    }).catch((error)=>{console.log('Error in Cloudinary: ',error)});
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(Date.now(), {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(Date.now(), {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
    return uploadResult;
};

module.exports = connectCloudinary;