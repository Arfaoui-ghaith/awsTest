const express = require('express');
const CustomerService = require("../../../services/CustomerService");
const customerRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

customerRouter.use(authorizeMiddleware.protect);
customerRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const employee = await CustomerService.addCustomer(body);
        res.status(201).send(employee);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding employee'
        res.status(400).send({ message })
    }
});

customerRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const customers = await CustomerService.getCustomers(shopId)
        res.status(200).send(customers);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching customers'
        res.status(400).send({ message })
    }
});

customerRouter.post('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const customers = await CustomerService.searchCustomers(shopId,req.body)
        res.status(200).send(customers);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching customers'
        res.status(400).send({ message })
    }
});


customerRouter.delete('/:customerId',async (req, res) => {
    try {
        if(!req.params.customerId){
            return res.status(404).send({message: 'Customer Id required to perform this action.'});
        }
        const customerId = req.params.customerId;
        await CustomerService.deleteEmployee(customerId);
        res.status(200).send({ message: 'Customer Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting employee'
        res.status(400).send({ message })
    }
})

module.exports = customerRouter;
