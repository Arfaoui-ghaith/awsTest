const express = require('express');
const multer = require('multer');
const path = require('path');
const PosSetupService = require("../../../services/PosSetupService");
const posSetupRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

posSetupRouter.use(authorizeMiddleware.protect);
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/images/',
        filename(req, file, cb) {
            cb(null, `${req.body.shopId}${path.extname(file.originalname)}`);
        },
        limits: { fileSize: 1000000 },
    }),
}).single('image');

posSetupRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const posSetup = await PosSetupService.getPosSetup(shopId)
        res.status(200).send(posSetup[0]);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching pos setup.'
        res.status(400).send({ message })
    }
});

// when we add shop, add pos 

posSetupRouter.put('/', upload, async (req, res) => {
    try {
        let payload = req.body;
        if (req.file) {
            payload = {
                ...payload,
                logo: req.file.path,
            };
        }
        const posSetup = await PosSetupService.updatePosSetup(payload);
        res.status(200).send(posSetup);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating pos setup.'
        res.status(400).send({ message })
    }
});

module.exports = posSetupRouter;



