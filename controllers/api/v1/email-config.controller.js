const express = require('express');
const EmailConfigService = require("../../../services/EmailConfigService");
const emailConfigRouter = express.Router();

emailConfigRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const emailConfig = await EmailConfigService.updateEmailConfig(body);
        res.status(200).send(emailConfig);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating email config'
        res.status(400).send({ message })
    }
});

emailConfigRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const emailConfig = await EmailConfigService.getEmailConfig(shopId)
        res.status(200).send(emailConfig);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching email config'
        res.status(400).send({ message })
    }
});

module.exports = emailConfigRouter;
