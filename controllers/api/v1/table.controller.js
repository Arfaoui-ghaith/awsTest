const express = require('express');
const TableService = require("../../../services/TableService");
const tableRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

tableRouter.use(authorizeMiddleware.protect);
tableRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const table = await TableService.createTable(body);
        res.status(201).send(table);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding table'
        res.status(400).send({ message })
    }
});

tableRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const tables = await TableService.getAllTables(shopId)
        res.status(200).send(tables);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching tables'
        res.status(400).send({ message })
    }
});

tableRouter.put('/', async (req, res) => {
    try {
        const body = req.body;
        const printer = await TableService.updateTable(body);
        res.status(201).send(printer);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating tables'
        res.status(400).send({ message })
    }
});

tableRouter.delete('/:tableId',async (req, res) => {
    try {
        if(!req.params.tableId){
            return res.status(404).send({message: 'Table Id required to perform this action.'});
        }
        const tableId = req.params.tableId;
        await TableService.deleteTable(tableId);
        res.status(201).send({ message: 'Table Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting table'
        res.status(400).send({ message })
    }
});

module.exports = tableRouter;
