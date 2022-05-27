const express = require('express');
const MenuItemCategoryService = require("../../../services/MenuItemCategoryService");
const menuItemCategoryRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');


menuItemCategoryRouter.get('/public', async (req, res) => {
    console.log(!(req.query.shopId || req.query.shopName))
    try {
        if(!(req.query.shopId || req.query.shopName)){
            return res.status(404).send({message: 'Shop Id or Shop Name required to perform this action.'});
        }
        const {shopId, shopName} = req.query;
        const menuItemCategories = await MenuItemCategoryService.getAllMenuItemCategories(shopId,shopName)
        res.status(200).send(menuItemCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching all menu item categories.'
        res.status(400).send({ message })
    }
});



menuItemCategoryRouter.get('/public/menu-item/variants', async (req, res) => {
    console.log(!(req.query.shopId || req.query.shopName))
    try {
        if(!(req.query.shopId || req.query.shopName)){
            return res.status(404).send({message: 'Shop Id or Shop Name required to perform this action.'});
        }
        const {shopId, shopName} = req.query;
        const menuItemCategories = await MenuItemCategoryService.getAllMenuItemCategoriesMenuItemsVariants(shopId,shopName)
        res.status(200).send(menuItemCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching all menu item categories.'
        res.status(400).send({ message })
    }
});

menuItemCategoryRouter.use(authorizeMiddleware.protect);

menuItemCategoryRouter.get('/', async (req, res) => {
    console.log(!(req.query.shopId || req.query.shopName))
    try {
        if(!(req.query.shopId || req.query.shopName)){
            return res.status(404).send({message: 'Shop Id or Shop Name required to perform this action.'});
        }
        const {shopId, shopName} = req.query;
        const menuItemCategories = await MenuItemCategoryService.getAllMenuItemCategoriesPrivet(shopId,shopName)
        res.status(200).send(menuItemCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching all menu item categories.'
        res.status(400).send({ message })
    }
});

menuItemCategoryRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const menuItemCategory = await MenuItemCategoryService.createMenuItemCategory(body);
        res.status(201).send(menuItemCategory);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding menu item category.'
        res.status(400).send({ message })
    }
});

menuItemCategoryRouter.put('/', async (req, res) => {
    try {
        const body = req.body;
        const menuItemCategory = await MenuItemCategoryService.updateMenuItemCategory(body);
        res.status(201).send(menuItemCategory);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating menu item category.'
        res.status(400).send({ message })
    }
});

menuItemCategoryRouter.delete('/:menuItemCategoryId',async (req, res) => {
    try {
        if(!req.params.menuItemCategoryId){
            return res.status(404).send({message: 'Menu Item Category Id required to perform this action.'});
        }
        const menuItemCategoryId = req.params.menuItemCategoryId;
        await MenuItemCategoryService.deleteMenuItemCategory(menuItemCategoryId);
        res.status(200).send({ message: 'Menu Item Category Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting the menu item category!'
        res.status(400).send({ message })
    }
});

module.exports = menuItemCategoryRouter;
