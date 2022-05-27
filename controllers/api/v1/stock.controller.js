const express = require('express');
const StockService = require("../../../services/StockService");
const StockLogService = require("../../../services/StockLogService");
const stockRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

stockRouter.use(authorizeMiddleware.protect);
stockRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const stock = await StockService.addStock(body);
        res.status(201).send(stock);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while creating stock.'
        res.status(400).send({ message })
    }
});

stockRouter.post('/adjust', async (req, res) => {
    try {
        const body = req.body;
        const stock = await StockService.adjustStock(body);
        res.status(201).send(stock);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while creating stock.'
        res.status(400).send({ message })
    }
});

stockRouter.post('/move-stock', async (req, res) => {
    try {
        const body = req.body;
        const stock = await StockService.moveStock(body);
        res.status(200).send(stock);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while moving stock.'
        res.status(400).send({ message })
    }
});

stockRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const stockCategories = await StockService.getAllStocks(shopId)
        res.status(200).send(stockCategories);
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while fetching all stocks.'
        res.status(400).send({ message })
    }
});

stockRouter.post('/list', async (req, res) => {
    try {
        const payload = req.body;
        const stockList = await StockLogService.getStockList(payload)
        res.status(200).send(stockList);
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while fetching stock list!'
        res.status(400).send({ message })
    }
});

//to do update stock


module.exports = stockRouter;
