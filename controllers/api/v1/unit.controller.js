const express = require('express');
const UnitService = require("../../../services/UnitService");
const unitRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

unitRouter.use(authorizeMiddleware.protect);

unitRouter.post('/', authorizeMiddleware.restrictTo('addUnit'),async (req, res) => {
    try {
        const body = req.body;
        const unit = await UnitService.createUnit(body);
        res.status(201).send(unit);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding unit'
        res.status(400).send({ message })
    }
});

unitRouter.get('/', async (req, res) => {
    try {
        const shopId = req.params.shopId;
        const units = await UnitService.getAllUnits(shopId)
        res.status(200).send(units);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching units'
        res.status(400).send({ message })
    }
});

unitRouter.put('/', authorizeMiddleware.restrictTo('editUnit'),async (req, res) => {
    try {
        const body = req.body;
        const unit = await UnitService.updateUnit(body);
        res.status(201).send(unit);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating units'
        res.status(400).send({ message })
    }
});

unitRouter.delete('/:unitId', authorizeMiddleware.restrictTo('deleteUnit'),authorizeMiddleware.deleteAuth(),async (req, res) => {
    try {
        if(!req.params.unitId){
            return res.status(404).send({message: 'Unit Id required to perform this action.'});
        }
        const unitId = req.params.unitId;
        await UnitService.deleteUnit(unitId);
        res.status(201).send({ message: 'Unit Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting unit'
        res.status(400).send({ message })
    }
});

module.exports = unitRouter;
