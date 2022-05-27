const express = require('express');
const ExpenseService = require("../../../services/ExpenseService");
const expenseRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

expenseRouter.use(authorizeMiddleware.protect);
expenseRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const expense = await ExpenseService.createExpense(body);
        res.status(201).send(expense);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding expense .'
        res.status(400).send({ message })
    }
});

expenseRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const expenses = await ExpenseService.getAllExpenses(shopId)
        res.status(200).send(expenses);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching all expense .'
        res.status(400).send({ message })
    }
});

expenseRouter.put('/', async (req, res) => {
    try {
        const body = req.body;
        const expense = await ExpenseService.updateExpense(body);
        res.status(201).send(expense);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating expense .'
        res.status(400).send({ message })
    }
});

expenseRouter.delete('/:expenseId',async (req, res) => {
    try {
        if(!req.params.expenseId){
            res.status(404).send({message: 'Expense Id required to perform this action.'});
        }
        const expenseId = req.params.expenseId;
        await ExpenseService.deleteExpense(expenseId);
        res.status(201).send({ message: 'Expense Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting expense'
        res.status(400).send({ message })
    }
})

module.exports = expenseRouter;
