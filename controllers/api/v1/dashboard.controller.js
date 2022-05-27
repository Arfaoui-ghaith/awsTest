const express = require('express');

const DashboardService = require("../../../services/DashboardService");
const dashboardRouter = express.Router();
const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

dashboardRouter.get('/todayExpense', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.todayExpense(req.query.shopId,req.query.companyId)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching todayExpense'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/trendExpense', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.trendExpense(req.query.shopId,req.query.companyId,req.query.startDate,req.query.endDate)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching trendExpense'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/openSessionsStart', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.lastSessionExpense(req.query.shopId,req.query.companyId)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching lastSessionExpense'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/todayBills', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.todayBills(req.query.shopId,req.query.companyId)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching todayBills'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/trendBills', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.trendBills(req.query.shopId,req.query.companyId,req.query.startDate,req.query.endDate)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching trendBills'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/lastSessionBill', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.lastSessionBill(req.query.shopId,req.query.companyId)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching lastSessionBill'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/currentEmployees', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.currentEmployees(req.query.shopId,req.query.companyId)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching current employees'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/getTopSellingItems', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.getTopSellingItemsToday(req.query.shopId/*,req.query.companyId*/)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching TopSellingItemsToday'
        res.status(400).send({ message })
    }
});



dashboardRouter.get('/getSellingItemsTrends', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.getSellingItemsTrends(req.query.shopId,req.query.companyId,req.query.startDate,req.query.endDate)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching SellingItemsTrends'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/getTopSellingItemsLastSessionToday', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.getTopSellingItemsLastSessionToday(req.query.shopId/*,req.query.companyId*/)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching TopSellingItemsLastSessionToday'
        res.status(400).send({ message })
    }
});



dashboardRouter.get('/getPurchasedStockToday', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.getPurchasedMaterialsToday(req.query.shopId/*,req.query.companyId*/)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching PurchasedMaterialsToday'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/getPurchasedStockLastSession', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.getPurchasedStockLastSession(req.query.shopId/*,req.query.companyId*/)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching PurchasedStockLastSession'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/mostDepletedStocksToday', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.getStockList(req.query.shopId/*,req.query.companyId*/)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching StockList'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/mostDepletedStocksTodayTotal', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.getStockListTotal(req.query.shopId,req.query.companyId)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching StockList'
        res.status(400).send({ message })
    }
});

dashboardRouter.get('/trendDashboard', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.trendDashboard(req.query.shopId,req.query.companyId,req.query.startDate,req.query.endDate)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching trendDashboard'
        res.status(400).send({ message })
    }
});



dashboardRouter.get('/', async (req, res) => {
    try {
        /*if(!req.user.CompanyId){
            throw Error("User company is is null.")
        }*/
        const result = await DashboardService.dashboard(req.query.shopId,req.query.companyId)
        res.status(200).send(result);
    } catch (e) {
        console.log(e)
        const message = e.message ? e.message : 'Some error occurred while fetching dashboard'
        res.status(400).send({ message })
    }
});

dashboardRouter.use(authorizeMiddleware.protect);



module.exports = dashboardRouter;