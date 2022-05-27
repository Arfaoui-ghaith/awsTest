const express = require('express');
const CountryService = require("../../../services/CountryService");
const countryRouter = express.Router();

const authorizeMiddleware = require('../../../middlewares/authorize.middleware.js');

countryRouter.use(authorizeMiddleware.protect);

countryRouter.post('/',async (req, res) => {
    try {
        const country = await CountryService.addCountry(req.body)
        res.status(201).send(country);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding country'
        res.status(400).send({ message })
    }
});

countryRouter.get('/',async (req, res) => {
    try {
        const countries = await CountryService.getAllCountries()
        res.status(201).send(countries);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding country'
        res.status(400).send({ message })
    }
});

countryRouter.put('/:countryId', async (req, res) => {
    try {
        if(!req.params.countryId){
            return res.status(404).send({message: 'country Id required to perform this action.'});
        }
        const country = await CountryService.updateCountry(req.params.countryId,req.body)
        res.status(200).send(country);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding country'
        res.status(400).send({ message })
    }
});

countryRouter.get('/:countryId',async (req, res) => {
    try {
        if(!req.params.countryId){
            return res.status(404).send({message: 'country Id required to perform this action.'});
        }
        const country = await CountryService.getCountry(req.params.countryId)
        res.status(200).send(country);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding country'
        res.status(400).send({ message })
    }
});

countryRouter.delete('/:countryId',async (req, res) => {
    try {
        if(!req.params.countryId){
            return res.status(404).send({message: 'country Id required to perform this action.'});
        }
        const countryId = req.params.countryId;
        await CountryService.deleteCountry(countryId);
        res.status(200).send({ message: 'country Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting country'
        res.status(400).send({ message })
    }
})

module.exports = countryRouter;