const express = require('express');
const SessionService = require("../../../services/SessionService");
const sessionRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

sessionRouter.use(authorizeMiddleware.protect);
sessionRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const printer = await SessionService.createSession(body);
        res.status(201).send(printer);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while creating session'
        res.status(400).send({ message })
    }
});

sessionRouter.get('/get-current-session/:shopId', async (req,res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const session = await SessionService.getCurrentSession(shopId)
        res.status(200).send(session);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching current session'
        res.status(400).send({ message })
    }
})

sessionRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        console.log(req.query)

        let {startDate, endDate} = req.query;
        const sessions = await SessionService.getAllSessions(shopId, startDate, endDate)
        res.status(200).send(sessions);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching sessions'
        res.status(400).send({ message })
    }
});

sessionRouter.put('/', async (req, res) => {
    try {
        const body = req.body;
        const session = await SessionService.updateSession(body);
        res.status(201).send(session);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating session'
        res.status(400).send({ message })
    }
});

module.exports = sessionRouter;
