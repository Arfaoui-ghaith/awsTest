const express = require('express');
const StockLogService = require("../../../services/StockLogService");
const stockLogRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

stockLogRouter.use(authorizeMiddleware.protect);
stockLogRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const stockCategories = await StockLogService.getStockLog(shopId)
        res.status(200).send(stockCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching all stocks.'
        res.status(400).send({ message })
    }
});

stockLogRouter.post('/purchase', async (req, res) => {
    try {
        const payload = req.body;
        const purchasedMaterials = await StockLogService.getPurchasedMaterials(payload)
        res.status(200).send(purchasedMaterials);
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while fetching all stocks.'
        res.status(400).send({ message })
    }
});

module.exports = stockLogRouter;
