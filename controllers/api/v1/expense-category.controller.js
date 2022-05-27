const express = require('express');
const ExpenseCategoryService = require("../../../services/ExpenseCategoryService");
const expenseCategoryRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

expenseCategoryRouter.use(authorizeMiddleware.protect);
expenseCategoryRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const expenseCategory = await ExpenseCategoryService.createExpenseCategory(body);
        res.status(201).send(expenseCategory);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while adding expense category.'
        res.status(400).send({ message })
    }
});

expenseCategoryRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id required to perform this action.'});
        }
        const shopId = req.params.shopId;
        const expenseCategories = await ExpenseCategoryService.getAllExpenseCategory(shopId)
        res.status(200).send(expenseCategories);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while fetching all expense categories.'
        res.status(400).send({ message })
    }
});

expenseCategoryRouter.put('/', async (req, res) => {
    try {
        const body = req.body;
        const expenseCategory = await ExpenseCategoryService.updateExpenseCategory(body);
        res.status(201).send(expenseCategory);
    } catch (e) {
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while updating expense category.'
        res.status(400).send({ message })
    }
});

expenseCategoryRouter.delete('/:expenseCatId',async (req, res) => {
    try {
        if(!req.params.expenseCatId){
            return res.status(404).send({message: 'Expanse Category Id required to perform this action.'});
        }
        const expenseCatId = req.params.expenseCatId;
        await ExpenseCategoryService.deleteExpenseCategory(expenseCatId);
        res.status(201).send({ message: 'Expense Category Deleted Successfully!'});
    } catch (e) {
        const message = e.message ? e.message : 'Some error occurred while deleting expense'
        res.status(400).send({ message })
    }
})

module.exports = expenseCategoryRouter;
