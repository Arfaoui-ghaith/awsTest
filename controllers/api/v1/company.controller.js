const express = require('express');
const CompanyService = require("../../../services/CompanyService");
const companyRouter = express.Router();

const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

companyRouter.use(authorizeMiddleware.protect);

companyRouter.post('/',async (req, res) => {
    try {
        const company = await CompanyService.addCompany(req.body)
        res.status(201).send(company);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding company'
        res.status(400).send({ message })
    }
});

companyRouter.get('/',/*authorizeMiddleware.restrictTo('viewCompany'),*/async (req, res) => {
    try {
        const companies = await CompanyService.getAllCompanies(req.user)
        res.status(201).send(companies);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding company'
        res.status(400).send({ message })
    }
});

companyRouter.put('/:companyId', async (req, res) => {
    try {
        if(!req.params.companyId){
            return res.status(404).send({message: 'Company Id required to perform this action.'});
        }
        const company = await CompanyService.updateCompany(req.params.companyId,req.body)
        res.status(200).send(company);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding company'
        res.status(400).send({ message })
    }
});

companyRouter.get('/:companyId',async (req, res) => {
    try {
        if(!req.params.companyId){
            return res.status(404).send({message: 'Company Id required to perform this action.'});
        }
        const company = await CompanyService.getCompany(req.params.companyId)
        res.status(200).send(company);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding company'
        res.status(400).send({ message })
    }
});

companyRouter.delete('/:companyId',async (req, res) => {
    try {
        if(!req.params.companyId){
            return res.status(404).send({message: 'Company Id required to perform this action.'});
        }
        const companyId = req.params.companyId;
        await CompanyService.deleteCompany(companyId);
        res.status(200).send({ message: 'Company Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting company'
        res.status(400).send({ message })
    }
})

module.exports = companyRouter;