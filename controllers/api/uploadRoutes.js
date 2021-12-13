const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
const { unlink } = require('fs');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

router.post('/upload', upload.single('myFile'), async ({ body, file }, res) => {
    // console.log(req.body); // req.body will hold the text fields appended to your formData object
    // console.log(req.file); // req.file is the name of your file in the form above, here 'uploaded_file'
    const { filename, destination } = file;
    const pathToFile = `${destination}/${filename}`;
    try {
         
        
        const { url } = await cloudinary.uploader
            .upload(pathToFile, {
                resource_type: "image",
                public_id: 'posts',
                crop: 'fill',
                width: 500, 
                height: 500
            },
                (error) => {
                    if (error) console.error(error)
                }
            );

        const httpsUrl = `https://${url.split('://')[1]}` 

        res.json({ ...body, url: httpsUrl }); 
        unlink(pathToFile, (error) => {
            if (error) console.error(error)
        });
    } catch (error) {
        console.error(error);
        res.json({ msg: 'failure' });
    }
});

module.exports = router;