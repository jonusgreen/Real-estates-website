const multer = require('multer')
const uploadcontroller = require('express').Router()


//destination where images will be saved
const storage = multer.diskStorage({
   destination: (req, file,cb) => {
    cb(null, 'public/imagess')
   }, 
   filename: (req, file, cb) => {
    cb(null, req.body.filename)
   }
})

const upload = multer({
    storage:storage
})


// upload.single image
uploadcontroller.post("/images", upload.single("image"), async(req, res) => {
    try {
         return res.status(200).json("file uploaded successfully")
    } catch (error) {
        console.error(error)
    }
})
module.exports = uploadcontroller