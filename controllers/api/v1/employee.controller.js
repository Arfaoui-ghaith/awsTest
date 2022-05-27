const express = require('express');
const ShopService = require("../../../services/ShopService");
const employeeRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

employeeRouter.use(authorizeMiddleware.protect);
employeeRouter.post('/',async (req, res) => {
    try {
        const body = req.body;
        const employee = await ShopService.addEmployee(body,req.user);
        res.status(201).send(employee);
    } catch (e) {
        /*console.log(e.message)*/
        const message = e.message ? e.message : 'Some error occurred while adding employee'
        res.status(400).send({ message })
    }
});

employeeRouter.get('/', async (req, res) => {
    try {
        const {shopId, companyId} = req.query;
        const employees = await ShopService.getEmployees(companyId,shopId,req.user)
        res.status(200).send(employees);
    } catch (e) {
        /*console.log(e.message)*/
        const message = e.message ? e.message : 'Some error occurred while fetching employees'
        res.status(400).send({ message })
    }
});

employeeRouter.put('/', authorizeMiddleware.editOnlySelfEmployee(),async (req, res) => {
    try {
        const body = {...req.body, id: req.user.id};
        const employee = await ShopService.updateEmployee(body);
        res.status(200).send(employee);
    } catch (e) {
        /*console.log(e.message)*/
        const message = e.message ? e.message : 'Some error occurred while updating employee'
        res.status(400).send({ message })
    }
})

employeeRouter.delete('/:employeeId', authorizeMiddleware.deleteAuth(),async (req, res) => {
    try {
        if(!req.params.employeeId){
            return res.status(404).send({message: 'Employee Id required to perform this action.'});
        }
        const employeeId = req.params.employeeId;
        await ShopService.deleteEmployee(employeeId,req.user);
        res.status(201).send({ message: 'Employee Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting employee'
        res.status(400).send({ message })
    }
})

module.exports = employeeRouter;
