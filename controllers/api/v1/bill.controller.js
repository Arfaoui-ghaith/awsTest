const express = require('express');
const BillService = require("../../../services/BillService");
const billRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

billRouter.use(authorizeMiddleware.protect);

billRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const bill = await BillService.createBill(body);
        res.status(201).send(bill);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while adding bill'
        res.status(400).send({ message })
    }
});

billRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const {sessionId} = req.query;
        const bills = await BillService.getAllBills(shopId, req.query)
        res.status(200).send(bills);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching bills'
        res.status(400).send({ message })
    }
});

/*billRouter.delete('/:billId', async (req, res) => {
    try {
        if(!req.params.billId){
            return res.status(404).send({message: 'Bill Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const message = await BillService.deletelBill(shopId, req.query)
        res.status(201).send({message});
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching bills'
        res.status(400).send({ message })
    }
});*/

billRouter.put('/:billId', async (req, res) => {
    try {
        if(!req.params.billId){
            return res.status(404).send({message: 'Bill Id required to perform this action.'});
        }
        const body = req.body;
        const printer = await BillService.updateBill(body,req.params.billId);
        res.status(201).send(printer);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating bills'
        res.status(400).send({ message })
    }
});

billRouter.delete('/:billId',async (req, res) => {
    try {
        if(!req.params.billId){
            return res.status(404).send({message: 'Bill Id required to perform this action.'});
        }
        if(!req.body.notes){
            return res.status(404).send({message: 'notes required to perform this action.'});
        }
        const billId = req.params.billId;
        const bill = await BillService.deletelBill(billId,req.body.notes)
        res.status(200).send({ message: 'Company Deleted Successfully!', bill});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting company'
        res.status(400).send({ message })
    }
})


// to do delete done


module.exports = billRouter;
