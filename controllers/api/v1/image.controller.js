const express = require('express');
const ImageService = require("../../../services/ImageService");
const authRouter = express.Router();

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// for super admin company admin shop or branch admin
authRouter.post('/upload',upload.single('image'), async (req, res) => {
    try {
        console.log(req.file)
        const file = req.file;
        const image = await ImageService.uploadImage(file)
        res.status(200).send(image);
    } catch (e) {
        const message = e.message || 'Error occurred while logging in.'
        res.status(400).send({message})
    }
});

module.exports = authRouter;