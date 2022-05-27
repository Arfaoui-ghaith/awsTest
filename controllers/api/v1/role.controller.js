const express = require('express');
const RoleService = require("../../../services/RoleService");
const roleRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

roleRouter.use(authorizeMiddleware.protect);

roleRouter.get('/', async (req, res) => {
    try {
        const roles = await RoleService.getAllRoles()
        res.status(200).send(roles);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while getting the Roles'
        res.status(400).send({ message })
    }
});

roleRouter.get('/permissions', async (req, res) => {
    try {
        const permissions = await RoleService.getAllRolesPermissions()
        res.status(200).send({permissions});
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while getting the Roles'
        res.status(400).send({ message })
    }
});

roleRouter.get('/:shopId', async (req, res) => {
    if(!req.params.shopId){
        return res.status(404).send({message: 'Shop Id required to perform this action.'});
    }
    const shopId = req.params.shopId;
    try {
        const roles = await RoleService.getRoles(shopId)
        res.status(200).send(roles);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while getting the Roles'
        res.status(400).send({ message })
    }
});

/*roleRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
        const employee = await RoleService.addRoleToShop(body);
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
        const role = await RoleService.addRoleToShop(body);
        res.status(201).send(role);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding the Role'
        res.status(400).send({ message })
    }
});


roleRouter.put('/', async (req, res) => {
    const body = req.body;
    try {
        const role = await RoleService.updateRole(body);
        res.status(201).send(role);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating the Role'
        res.status(400).send({ message })
    }
})

roleRouter.delete('/:roleId',async (req, res) => {
    if(!req.params.roleId){
        return res.status(404).send({message: 'Role Id required to perform this action.'});
    }
    const roleId = req.params.roleId;
    try {
        await RoleService.deleteRole(roleId);
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting the Role'
        res.status(400).send({ message })
    }
})

module.exports = roleRouter;
