const express = require('express');
const BillItemService = require("../../../services/BillItemService");
const billItemRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

billItemRouter.use(authorizeMiddleware.protect);

billItemRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const billItem = await BillItemService.createBillItem(body);
        res.status(201).send(billItem);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding bill item.'
        res.status(400).send({ message })
    }
});

billItemRouter.put('/:id', async (req, res) => {
    try {
        if(!req.params.id){
            return res.status(404).send({message: 'Bill item Id required to perform this action.'});
        }
        const body = req.body;
        const billItem = await BillItemService.updateBillItem(body,req.params.id);
        res.status(201).send(billItem);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating bill item.'
        res.status(400).send({ message })
    }
});

billItemRouter.get('/:shopId/status/:printerId', async (req, res) => {
    try {
        // if(!req.params.id){
        //     return res.status(404).send({message: 'Bill item Id required to perform this action.'});
        // }
        const billItems = await BillItemService.getByStatus(req.params.shopId,req.params.printerId);
        res.status(201).send(billItems);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting all bill items.'
        res.status(400).send({ message })
    }
});

billItemRouter.get('/:id/printer', async (req, res) => {
    try {
        if(!req.params.id){
            return res.status(404).send({message: 'Bill item Id required to perform this action.'});
        }
        const billItems = await BillItemService.getByPrinter(req.params.id);
        res.status(201).send(billItems);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting all bill items.'
        res.status(400).send({ message })
    }
});

billItemRouter.delete('/all', async (req, res) => {
    try {
        await BillItemService.deleteAllBillItem(req.query.shopId,req.query.sessionId);
        res.status(201).send({ message: "All Bill-Items deleted !"});
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting all bill items.'
        res.status(400).send({ message })
    }
});

billItemRouter.delete('/:id', async (req, res) => {
    try {
        if(!req.params.id){
            return res.status(404).send({message: 'Bill item Id required to perform this action.'});
        }
        const billItem = await BillItemService.deleteBillItem(req.params.id);
        res.status(201).send({billItem});
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while deleting bill item.'
        res.status(400).send({ message })
    }
});

module.exports = billItemRouter;