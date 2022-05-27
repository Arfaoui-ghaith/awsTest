const ShopService = require("./ShopService");
const { Expense, ExpenseCategory } = require("../models");
const { v4: uuidv4 } = require('uuid');

class ExpenseService {
    static async createExpense(expenseParams) {
        const {shopId, date, cost, description, expenseCategoryId } = expenseParams;
        const shop = await ShopService.getShopById(shopId)
        const expenseCategory = await ExpenseCategory.findOne({where: {id: expenseCategoryId, ShopId: shopId}});

        if(!expenseCategory) {
            throw Error('Expense category is required to create expense.')
        }

        const expense = await Expense.create({
            id: uuidv4(),
            date,
            cost,
            description,
            ExpenseCategoryId: expenseCategoryId
        });
        expenseCategory.isDeletable = false;
        await expenseCategory.save();
        await shop.addExpense(expense);
        return expense;
    }

    static async getAllExpenses(shopId) {
        const expenses = await Expense.findAll({where: {ShopId: shopId, isActive: true}, include: [ExpenseCategory]});
        return expenses;
    }

    static async updateExpense(expenseParams) {
        const {id, date, cost, description, expenseCategoryId } = expenseParams;
        const expense = await Expense.findByPk(id);
        expense.date = date || expense.date;
        expense.cost = cost || expense.cost;
        expense.description = description || expense.description;
        expense.ExpenseCategoryId = expenseCategoryId || expense.ExpenseCategoryId;
        await expense.save();
        return expense;
    }

    static async deleteExpense(expenseId) {
        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
            throw Error('No Expense found for the given Id.')
        }
        if (expense.isDeletable) {
            return await Expense.destroy({where: {id: expenseId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the expense which are in action!');
        }
    }
}

module.exports = ExpenseService;
