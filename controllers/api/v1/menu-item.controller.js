const express = require('express');
const MenuItemService = require("../../../services/MenuItemService");
const menuItemRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');



menuItemRouter.get('/variants/public/', async (req, res) => {
    try {
        if(!req.query.shopName){
            return res.status(404).send({message: 'Shop Name required to perform this action.'});
        }
        const {shopName} = req.query;
        const menuItemVariants = await MenuItemService.getAllVariantsOfMenuItemsByShopName(shopName)
        res.status(200).send(menuItemVariants);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching all menu items.'
        res.status(400).send({ message })
    }
});

menuItemRouter.get('/public', async (req, res) => {
    try {
        console.log(!(req.query.shopId || req.query.shopName))
        if(!(req.query.shopId || req.query.shopName)){
            return res.status(404).send({message: 'Shop Id or Shop Name required to perform this action.'});
        }
        const {shopId, shopName} = req.query;
        const menuItemCategories = await MenuItemService.getAllMenuItems(shopId,shopName)
        res.status(200).send(menuItemCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching all menu items.'
        res.status(400).send({ message })
    }
});


menuItemRouter.use(authorizeMiddleware.protect);
menuItemRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const menuItem = await MenuItemService.createMenuItem(body);
        res.status(201).send(menuItem);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding menu item.'
        res.status(400).send({ message })
    }
});

menuItemRouter.post('/variant', async (req, res) => {
    try {
        const body = req.body;
        const menuItem = await MenuItemService.createMenuItemVariant(body);
        res.status(201).send(menuItem);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding menu item.'
        res.status(400).send({ message })
    }
});



menuItemRouter.post('/top-selling-item/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const { startDate, endDate } = req.body;
        const topMenuItems = await MenuItemService.getTopSellingItem(shopId, startDate, endDate);
        res.status(200).send(topMenuItems);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching top menu items.'
        res.status(400).send({ message })
    }
});

menuItemRouter.get('/:shopId/favourite', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const menuItemCategories = await MenuItemService.getAllFavouriteMenuItems(shopId)
        res.status(200).send(menuItemCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : `Some error occurred while fetching favourite menu items`
        res.status(400).send({ message });
    }
});

menuItemRouter.get('/:shopId/:categoryId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        if(!req.params.categoryId){
            return res.status(404).send({message: 'Category Id required to perform this action.'});
        }
        const categoryId = req.params.categoryId;
        const menuItemCategories = await MenuItemService.getMenuItemsByCategoryId(shopId, categoryId)
        res.status(200).send(menuItemCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : `Some error occurred while fetching menu item for categoryID: ${categoryId}`
        res.status(400).send({ message });
    }
});

menuItemRouter.put('/:menuItemId', async (req, res) => {
    try {
        if(!req.params.menuItemId){
            return res.status(404).send({message: 'menu item id required to perform this action.'});
        }
        if(Object.keys(req.body).length === 0){
            return res.status(404).send({ message: 'Request body is empty.' })
        }
        const body = req.body;
        const menuItem = await MenuItemService.updateMenuItem(body,req.params.menuItemId);
        res.status(201).send(menuItem);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating menu item.'
        res.status(400).send({ message })
    }
});

menuItemRouter.put('/variant/:variantId', async (req, res) => {
    try {
        if(!req.params.variantId){
            return res.status(404).send({message: 'variant id required to perform this action.'});
        }
        const body = req.body;
        const menuItem = await MenuItemService.updateMenuItemVariant(body,req.params.variantId);
        res.status(201).send(menuItem);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while updating menu item.'
        res.status(400).send({ message })
    }
});

menuItemRouter.delete('/:menuItemId',async (req, res) => {
    try {
        if(!req.params.menuItemId){
            return res.status(404).send({message: 'Menu Item Id required to perform this action.'});
        }
        const menuItemId = req.params.menuItemId;
        const menuItem = await MenuItemService.deleteMenuItem(menuItemId);
        res.status(200).send({ message: 'Menu Item Deleted Successfully!'});
        // res.status(200).send(menuItem);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting the menu items!'
        res.status(400).send({ message })
    }
});

menuItemRouter.delete('/variant/:menuItemId/:variantId',async (req, res) => {
    try {
        if(!req.params.variantId){
            return res.status(404).send({message: 'Variant Id required to perform this action.'});
        }
        if(!req.params.menuItemId){
            return res.status(404).send({message: 'Menu Item Id required to perform this action.'});
        }
        const variantId = req.params.variantId;
        const menuItemId = req.params.menuItemId;
        const menuItem = await MenuItemService.deleteVariant(menuItemId, variantId);
        res.status(200).send({ message: 'Menu Variant Deleted Successfully!'});
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting the menu items!'
        res.status(400).send({ message })
    }
});


module.exports = menuItemRouter;
