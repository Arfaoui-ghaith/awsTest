const ShopService = require("./ShopService");
const { ExpenseCategory } = require("../models");
const { v4: uuidv4 } = require('uuid');

class ExpenseCategoryService {
    static async createExpenseCategory(expenseCategoryParams) {
        const {shopId, name, description } = expenseCategoryParams;
        const shop = await ShopService.getShopById(shopId)

        const expences = await ExpenseCategory.findAll({ where:{ name, ShopId: shop.id, isActive: true }})

        if(expences.length > 0 ){
            throw Error('Expense category name already used!')
        }

        const expenseCategory = await ExpenseCategory.create({
            id: uuidv4(),
            name,
            description
        });
        await shop.addExpenseCategory(expenseCategory);
        return expenseCategory;
    }

    static async getAllExpenseCategory(shopId) {
        const expenseCategories = await ExpenseCategory.findAll({where: {ShopId: shopId, isActive: true}});
        return expenseCategories;
    }

    static async updateExpenseCategory(expenseCategoryParams) {
        const {id, name, description } = expenseCategoryParams;
        const expenseCategory = await ExpenseCategory.findByPk(id);

        if(name && expenseCategory.name != name){
            const expences = await ExpenseCategory.findAll({ where: {name, ShopId: expenseCategory.ShopId, isActive: true }})
            if(expences.length > 0 ){
                throw Error('Expense category name already used!')
            }
            expenseCategory.name = name
        }
        
        expenseCategory.description = description || expenseCategory.description;
        await expenseCategory.save();
        return expenseCategory;
    }

    static async deleteExpenseCategory(expenseCategoryId) {
        const expenseCategory = await ExpenseCategory.findByPk(expenseCategoryId);
        if (!expenseCategory) {
            throw Error('No expense category found for the given Id.')
        }
        if (expenseCategory.isDeletable) {
            return await ExpenseCategory.destroy({where: {id: expenseCategoryId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the expense-category which are in action!');
        }
    }
}

module.exports = ExpenseCategoryService;
