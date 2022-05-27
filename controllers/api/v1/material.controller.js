const express = require('express');
const materialRouter = express.Router();
const MaterialService = require("../../../services/MaterialService");
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

materialRouter.use(authorizeMiddleware.protect);
materialRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const material = await MaterialService.createMaterial(body);
        res.status(201).send(material);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while creating the material'
        res.status(400).send({ message })
    }
});

materialRouter.get('/:shopId', async (req, res) => {
    if(!req.params.shopId){
        return res.status(404).send({message: 'Shop Id required to perform this action.'});
    }
    const shopId = req.params.shopId;
    const materials = await MaterialService.getAllMaterials(shopId);
    res.status(200).send(materials)
});

materialRouter.put('/:materialId', async (req, res) => {
    try {
        if(!req.params.materialId){
            return res.status(404).send({message: 'material Id required to perform this action.'});
        }
        const body = req.body;
        const material = await MaterialService.updateMaterial(body,req.params.materialId);
        res.status(200).send(material);
    }catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while creating the material'
        res.status(400).send({ message })
    }
})

materialRouter.delete('/:materialId',async (req, res) => {
    try {
        const materialId = req.params.materialId;
        const materialItem = await MaterialService.deleteMaterial(materialId);
        res.status(200).send({ message: 'Material Deleted Successfully!'});
        // res.status(200).send(menuItem);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting the material!'
        res.status(400).send({ message })
    }
});

module.exports = materialRouter;
