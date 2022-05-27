const express = require('express');
const StoreService = require("../../../services/StoreService");
const storeRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

storeRouter.use(authorizeMiddleware.protect);
storeRouter.post('/', async (req, res) => {
 try {
     const body = req.body;
     const store = await StoreService.createStore(body,req.user);
     res.status(201).send(store);
 } catch (e) {
     console.log(e.message)
     const message = e.message ? e.message : 'Some error occurred while creating the Store!'
     res.status(400).send({ message })
 }
});

storeRouter.get('/:shopId', async (req, res) => {
    try{
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const stores = await StoreService.getAllStores(shopId);
        res.status(200).send(stores)
    }catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while creating the Store!'
        res.status(400).send({ message })
    }
});

storeRouter.put('/:storeId', async (req, res) => {
    try{
        if(!req.params.storeId){
            return res.status(404).send({message: 'Store Id required to perform this action.'});
        }
        const body = req.body;
        const store = await StoreService.updateStore(body,req.params.storeId);
        res.status(200).send(store);
    }catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while updating the Store!'
        res.status(400).send({ message })
    }
})

storeRouter.delete('/:storeId',async (req, res) => {
    try {
        if(!req.params.storeId){
            return res.status(404).send({message: 'Store Id required to perform this action.'});
        }
        const storeId = req.params.storeId;
        await StoreService.deleteStore(storeId);
        res.status(200).send({ message: 'Store Deleted Successfully!'});
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting the material!'
        res.status(400).send({ message })
    }
});

module.exports = storeRouter;
