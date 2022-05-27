const express = require('express');
const RoleCategoryService = require("../../../services/RoleCategoryService");
const roleRouter = express.Router();
const authorizeMiddleware = require('../../../middlewares/authorize.middleware.js');

roleRouter.use(authorizeMiddleware.protect);

roleRouter.get('/', async (req, res) => {
    try {
        const rolesCategories = await RoleCategoryService.getAllRolesCategories(req.user)
        res.status(200).send(rolesCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while getting the Roles'
        res.status(400).send({ message })
    }
});

roleRouter.get('/permissions', async (req, res) => {
    try {
        const permissions = await RoleCategoryService.getAllRolesCategoriesPermissions()
        res.status(200).send({permissions});
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while getting the Roles'
        res.status(400).send({ message })
    }
});

/*roleRouter.get('/:shopId', async (req, res) => {
    if(!req.params.shopId){
        return res.status(404).send({message: 'Shop Id required to perform this action.'});
    }
    const shopId = req.params.shopId;
    try {
        const roles = await RoleCategoryService.getgetRoles(shopId)
        res.status(200).send(roles);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while getting the Roles'
        res.status(400).send({ message })
    }
});*/

/*roleRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
        const employee = await RoleCategoryService.addRoleToShop(body);
        res.status(201).send(employee);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding the Role'
        res.status(400).send({ message })
    }
});*/

roleRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
        const roleCategory = await RoleCategoryService.addRoleCategory(body);
        res.status(201).send(roleCategory);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding the Role'
        res.status(400).send({ message })
    }
});


roleRouter.put('/:roleCategoryId', async (req, res) => {
    if(!req.params.roleCategoryId){
        return res.status(404).send({message: 'Role Category Id required to perform this action.'});
    }
    const body = req.body;
    try {
        const roleCategory = await RoleCategoryService.updateRoleCategory(body,req.params.roleCategoryId);
        res.status(201).send(roleCategory);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating the Role'
        res.status(400).send({ message })
    }
})

roleRouter.delete('/:roleCategoryId',async (req, res) => {
    if(!req.params.roleCategoryId){
        return res.status(404).send({message: 'Role Category Id required to perform this action.'});
    }
    const roleCategoryId = req.params.roleCategoryId;
    try {
        await RoleCategoryService.deleteRoleCategory(roleCategoryId)
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting the Role'
        res.status(400).send({ message })
    }
})

module.exports = roleRouter;
