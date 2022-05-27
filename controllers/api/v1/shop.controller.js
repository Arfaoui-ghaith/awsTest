const express = require('express');
const shopRouter = express.Router();
const ShopService = require("../../../services/ShopService");
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

shopRouter.use(authorizeMiddleware.protect);
// TODO anyone can add new shops ?
shopRouter.post('/', async (req, res) => {
    try{
    console.log("req.user", req.user);
    const body = req.body;
    const shop = await ShopService.createShop(body);
    res.status(201).send(shop);
    }catch(e){
        const message = e.message ? e.message : 'Some error occurred while adding a shop';
        res.status(400).send({ message })
    }
});

shopRouter.get('/', async (req, res) => {
    try{
        const shops = await ShopService.getAllShops(req.user);
        res.status(200).send(shops)
    }catch(e){
        const message = e.message ? e.message : 'Some error occurred while fetching the shops';
        res.status(400).send({ message })
    }
});

// TODO should be POST ?
shopRouter.get('/:shopId', async (req, res) => {
   try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
       const shopId = req.params.shopId;
       const shop = await ShopService.getShopById(shopId);
       res.status(200).send(shop);
   } catch(e) {
       console.log(e.message)
       const message = e.message ? e.message : 'Some error occurred while fetching the shop Info';
       res.status(400).send({ message })
   }
});

shopRouter.delete('/:shopId',async (req, res) => {
    try {
         if(!req.params.shopId){
             return res.status(404).send({message: 'Shop Id required to perform this action.'});
         }
        const shopId = req.params.shopId;
        const shop = await ShopService.deleteShop(shopId);
        res.status(200).send({shop, message: 'Shop Deleted Successfully !'});
    } catch(e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting the shop Info';
        res.status(400).send({ message })
    }
});

shopRouter.put('/', async (req, res) => {
    try {
         if(!req.body.shopId){
             return res.status(404).send({message: 'Shop Id required to perform this action.'});
         }
        const shopId = req.body.shopId;
        const shop = await ShopService.updateShop(shopId,req.body);
        res.status(200).send(shop);
    } catch(e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating the shop Info';
        res.status(400).send({ message })
    }
});

shopRouter.put('/:shopId', async (req, res) => {
    try {
         if(!req.params.shopId){
             return res.status(404).send({message: 'Shop Id required to perform this action.'});
         }
        const shopId = req.params.shopId;
        const shop = await ShopService.updateShop(shopId,req.body);
        res.status(200).send(shop);
    } catch(e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while updating the shop Info';
        res.status(400).send({ message })
    }
});

module.exports = shopRouter;
