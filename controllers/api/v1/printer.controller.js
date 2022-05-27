const express = require('express');
const PrinterService = require("../../../services/PrinterService");
const printerRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

printerRouter.use(authorizeMiddleware.protect);
printerRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const printer = await PrinterService.createPrinter(body);
        res.status(201).send(printer);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding printer'
        res.status(400).send({ message })
    }
});

printerRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Printer Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const printers = await PrinterService.getAllPrinters(shopId)
        res.status(200).send(printers);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching printers'
        res.status(400).send({ message })
    }
});

printerRouter.put('/:printerId', async (req, res) => {
    try {
        if(!req.params.printerId){
            return res.status(404).send({message: 'Printer Id required to perform this action.'});
        }
        const body = req.body;
        const printer = await PrinterService.updatePrinter(body,req.params.printerId);
        res.status(201).send(printer);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating printer'
        res.status(400).send({ message })
    }
});

printerRouter.put('/:printerId', async (req, res) => {
    try {
        if(!req.params.printerId){
            return res.status(404).send({message: 'Printer Id required to perform this action.'});
        }
        const printer = await PrinterService.deletePrinter(req.params.printerId);
        res.status(203).send(printer);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating printer'
        res.status(400).send({ message })
    }
});

module.exports = printerRouter;
