'use strict';
const { v4: uuidv4 } = require('uuid');
const faker = require('faker')
const bcrypt = require('bcryptjs');
const {Op} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    function randomIntFromInterval(min, max) { // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function createPassword(password) {
      return bcrypt.hashSync(password, 10);
    }

    // countries
    const countries = [{
      id: uuidv4(),
      name: 'India',
      currency: 'Rupee',
      currencySymbol: '₹',
      description: 'India',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isDeletable: false
    }, {
      id: uuidv4(),
      name: 'Qatar',
      currency: 'QAR',
      currencySymbol: 'QAR',
      description: 'Qatar',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isDeletable: true
    }];

    // companies
    const companies = [{
      id: uuidv4(),
      name: 'Saas Company',
      description: 'Saas Company',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isDeletable: true,
      maxShops: 99,
      maxEmployees: 99
    }];

    const rolesCategories = [
    {
      id: uuidv4(),
      name: "SUPER_ADMIN",
      editCompany: true,
      viewCompany: true,
      addCompany: true,
      deleteCompany: true,
      editCountry: true,
      viewCountry: true,
      addCountry: true,
      deleteCountry: true,
      editUnit: true,
      viewUnit: true,
      addUnit: true,
      deleteUnit: true,
      editRoles: false,
      viewRoles: false,
      addRoles: false,
      deleteRoles: false,
      editEmployee: false,
      addEmployee: false,
      deleteEmployee: false,
      editMaterial: false,
      viewMaterial: false,
      addMaterial: false,
      deleteMaterial: false,
      editMenuItemCategory: false,
      viewMenuItemCategory: false,
      addMenuItemCategory: false,
      deleteMenuItemCategory: false,
      editMenuItem: false,
      viewMenuItem: false,
      addMenuItem: false,
      deleteMenuItem: false,
      editPOSSettings: false,
      viewPOSSettings: false,
      addBill: false,
      deleteBill: false,
      viewBill: false,
      editBill: false,
      viewStock: false,
      adjustStock: false,
      moveStock: false,
      editExpenseCategory: false,
      viewExpenseCategory: false,
      addExpenseCategory: false,
      deleteExpenseCategory: false,
      editExpense: false,
      viewExpense: false,
      addExpense: false,
      deleteExpense: false,
      addTable: false,
      deleteTable: false,
      viewTable: false,
      editTable: false,
      viewReports: false,
      viewDashboard: false,
      editSession: false,
      accessSettings: false,
      accessBilling: false,
      accessPin: false,
      minimizePOS: false,
      isDeletable: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      viewStores: false,
      addStores: false,
      editStores: false,
      deleteStores: false,
      viewShops: false,
      addShops: false,
      editShops: false,
      deleteShops: false,
      addVariant: false,
      editCompanyAdmin: false,
      deleteBranchAdmin: false,
      addCompanyAdmin: true,
      editBranchAdmin: true,
      addBranchAdmin: false,
      deleteCompanyAdmin: true,
      addSuperAdmin: true,
      editSuperAdmin: true,
      deleteSuperAdmin: true,
      viewUsers: true,
      accessPrinter: false,
      updsteStock: false,
      editVariant: false,
      deleteVariant: false,
      viewPrinter: false,
      addPrinter: false,
      editPrinter: false,
      deletePrinter: false
    },{
      id: uuidv4(),
      name: "COMPANY_ADMIN",
      editCompany: false,
      viewCompany: true,
      addCompany: false,
      deleteCompany: false,
      editCountry: false,
      viewCountry: false,
      addCountry: false,
      deleteCountry: false,
      editUnit: false,
      viewUnit: false,
      addUnit: false,
      deleteUnit: false,
      editRoles: false,
      viewRoles: false,
      addRoles: false,
      deleteRoles: false,
      editEmployee: false,
      addEmployee: false,
      deleteEmployee: false,
      editMaterial: false,
      viewMaterial: false,
      addMaterial: false,
      deleteMaterial: false,
      editMenuItemCategory: false,
      viewMenuItemCategory: false,
      addMenuItemCategory: false,
      deleteMenuItemCategory: false,
      editMenuItem: false,
      viewMenuItem: false,
      addMenuItem: false,
      deleteMenuItem: false,
      editPOSSettings: false,
      viewPOSSettings: false,
      addBill: false,
      deleteBill: false,
      viewBill: false,
      editBill: false,
      viewStock: false,
      adjustStock: false,
      moveStock: false,
      editExpenseCategory: false,
      viewExpenseCategory: false,
      addExpenseCategory: false,
      deleteExpenseCategory: false,
      editExpense: false,
      viewExpense: false,
      addExpense: false,
      deleteExpense: false,
      addTable: false,
      deleteTable: false,
      viewTable: false,
      editTable: false,
      viewReports: true,
      viewDashboard: true,
      editSession: false,
      accessSettings: false,
      accessBilling: false,
      accessPin: false,
      minimizePOS: false,
      isDeletable: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      viewStores: true,
      addStores: true,
      editStores: true,
      deleteStores: true,
      viewShops: true,
      addShops: true,
      editShops: true,
      deleteShops: true,
      addVariant: false,
      editCompanyAdmin: true,
      deleteBranchAdmin: true,
      addCompanyAdmin: true,
      editBranchAdmin: true,
      addBranchAdmin: true,
      deleteCompanyAdmin: true,
      addSuperAdmin: false,
      editSuperAdmin: false,
      deleteSuperAdmin: false,
      viewUsers: true,
      accessPrinter: false,
      updsteStock: false,
      editVariant: false,
      deleteVariant: false,
      viewPrinter: false,
      addPrinter: false,
      editPrinter: false,
      deletePrinter: false
    },
    {
      id: uuidv4(),
      name: "EMPLOYEE",
      editCompany: false,
      viewCompany: false,
      addCompany: false,
      deleteCompany: false,
      editCountry: false,
      viewCountry: false,
      addCountry: false,
      deleteCountry: false,
      editUnit: false,
      viewUnit: false,
      addUnit: false,
      deleteUnit: false,
      editRoles: true,
      viewRoles: true,
      addRoles: true,
      deleteRoles: true,
      editEmployee: true,
      addEmployee: true,
      deleteEmployee: true,
      editMaterial: true,
      viewMaterial: true,
      addMaterial: true,
      deleteMaterial: true,
      editMenuItemCategory: true,
      viewMenuItemCategory: true,
      addMenuItemCategory: true,
      deleteMenuItemCategory: true,
      editMenuItem: true,
      viewMenuItem: true,
      addMenuItem: true,
      deleteMenuItem: true,
      editPOSSettings: true,
      viewPOSSettings: true,
      addBill: true,
      deleteBill: true,
      viewBill: true,
      editBill: true,
      viewStock: true,
      adjustStock: true,
      moveStock: true,
      editExpenseCategory: true,
      viewExpenseCategory: true,
      addExpenseCategory: true,
      deleteExpenseCategory: true,
      editExpense: true,
      viewExpense: true,
      addExpense: true,
      deleteExpense: true,
      addTable: true,
      deleteTable: true,
      viewTable: true,
      editTable: true,
      viewReports: true,
      viewDashboard: false,
      editSession: true,
      accessSettings: true,
      accessBilling: true,
      accessPin: true,
      minimizePOS: true,
      isDeletable: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      viewStores: true,
      addStores: true,
      editStores: true,
      deleteStores: true,
      viewShops: true,
      addShops: true,
      editShops: true,
      deleteShops: true,
      addVariant: true,
      editCompanyAdmin: false,
      deleteBranchAdmin: false,
      addCompanyAdmin: false,
      editBranchAdmin: false,
      addBranchAdmin: false,
      deleteCompanyAdmin: false,
      addSuperAdmin: false,
      editSuperAdmin: false,
      deleteSuperAdmin: false,
      viewUsers: true,
      accessPrinter: true,
      updsteStock: true,
      editVariant: true,
      deleteVariant: true,
      viewPrinter: true,
      addPrinter: true,
      editPrinter: true,
      deletePrinter: true
    },
    {
      id: uuidv4(),
      name: "BRANCH_ADMIN",
      editCompany: false,
      viewCompany: false,
      addCompany: false,
      deleteCompany: false,
      editCountry: false,
      viewCountry: false,
      addCountry: false,
      deleteCountry: false,
      editUnit: false,
      viewUnit: false,
      addUnit: false,
      deleteUnit: false,
      editRoles: true,
      viewRoles: true,
      addRoles: true,
      deleteRoles: true,
      editEmployee: true,
      addEmployee: true,
      deleteEmployee: true,
      editMaterial: true,
      viewMaterial: true,
      addMaterial: true,
      deleteMaterial: true,
      editMenuItemCategory: true,
      viewMenuItemCategory: true,
      addMenuItemCategory: true,
      deleteMenuItemCategory: true,
      editMenuItem: true,
      viewMenuItem: true,
      addMenuItem: true,
      deleteMenuItem: true,
      editPOSSettings: true,
      viewPOSSettings: true,
      addBill: true,
      deleteBill: true,
      viewBill: true,
      editBill: true,
      viewStock: true,
      adjustStock: true,
      moveStock: true,
      editExpenseCategory: true,
      viewExpenseCategory: true,
      addExpenseCategory: true,
      deleteExpenseCategory: true,
      editExpense: true,
      viewExpense: true,
      addExpense: true,
      deleteExpense: true,
      addTable: true,
      deleteTable: true,
      viewTable: true,
      editTable: true,
      viewReports: true,
      viewDashboard: true,
      editSession: true,
      accessSettings: true,
      accessBilling: true,
      accessPin: true,
      minimizePOS: true,
      isDeletable: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      viewStores: true,
      addStores: false,
      editStores: false,
      deleteStores: false,
      viewShops: true,
      addShops: true,
      editShops: true,
      deleteShops: true,
      addVariant: true,
      editCompanyAdmin: false,
      deleteBranchAdmin: false,
      addCompanyAdmin: false,
      editBranchAdmin: false,
      addBranchAdmin: false,
      deleteCompanyAdmin: false,
      addSuperAdmin: false,
      editSuperAdmin: false,
      deleteSuperAdmin: false,
      viewUsers: true,
      accessPrinter: true,
      updsteStock: true,
      editVariant: true,
      deleteVariant: true,
      viewPrinter: true,
      addPrinter: true,
      editPrinter: true,
      deletePrinter: true
    }];

    // employees
    const employees = [{
      id: uuidv4(),
      name: 'Super User',
      email: 'superadmin@pos.in',
      RoleCategoryId: rolesCategories[0].id,
      pin: 1234,
      password: createPassword('password123'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeletable: true,
    }];

    const units = [
      {
        isDeletable : true,
        ShopId : null,
        id : uuidv4(),
        updatedAt : new Date(),
        description : "pound",
        shortForm : "pd",
        name : "pound",
        createdAt : new Date()
      },
      {
        isDeletable : true,
        ShopId : null,
        id : uuidv4(),
        updatedAt : new Date(),
        description : "kilogram",
        shortForm : "Kg",
        name : "kilo grams",
        createdAt : new Date()
      },
      {
        isDeletable : true,
        ShopId : null,
        id : uuidv4(),
        updatedAt : new Date(),
        description : "ml",
        shortForm : "ml",
        name : "ml",
        createdAt : new Date()
      },
      {
        isDeletable : true,
        ShopId : null,
        id : uuidv4(),
        updatedAt : new Date(),
        description : "grams",
        shortForm : "g",
        name : "grams",
        createdAt : new Date()
      }
    ]


    // console.log(materials)
    await queryInterface.bulkInsert('Countries', countries);
    await queryInterface.bulkInsert('Companies', companies);
    await queryInterface.bulkInsert('RoleCategories', rolesCategories);
    await queryInterface.bulkInsert('Employees', employees);
    await queryInterface.bulkInsert('Units', units);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Countries', {});
    await queryInterface.bulkDelete('Companies', {});
    await queryInterface.bulkDelete('Employees', {});
    await queryInterface.bulkDelete('RoleCategories', {});
    await queryInterface.bulkDelete('Units', {});
    
  }
};