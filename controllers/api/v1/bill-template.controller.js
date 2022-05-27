const express = require('express');
const BillTemplateService = require("../../../services/BillTemplateService");
const billTemplateRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

//billTemplateRouter.use(authorizeMiddleware.protect);
billTemplateRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const billTemplate = await BillTemplateService.createBillTemplate(body);
        res.status(201).send(billTemplate);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding bill template.'
        res.status(400).send({ message })
    }
});

billTemplateRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const billTemplate = await BillTemplateService.getAllBillTemplates(shopId)
        res.status(200).send(billTemplate);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching bill templates.'
        res.status(400).send({ message })
    }
});

billTemplateRouter.put('/:billTemplateId', async (req, res) => {
    try {
        if(!req.params.billTemplateId){
            return res.status(404).send({message: 'Bill Template Id required to perform this action.'});
        }
        const body = req.body;
        const billTemplate = await BillTemplateService.updateBillTemplates(body,req.params.billTemplateId);
        res.status(201).send(billTemplate);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating bill templates.'
        res.status(400).send({ message })
    }
});

module.exports = billTemplateRouter;
