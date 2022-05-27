const { StockLog, Stock, Store } = require("../models");
const ShopService = require("./ShopService");
const { Op, fn, col } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

class StockLogService {
    static async getStockLog(shopId) {
        const stockLogs = await StockLog.findAll({where: {ShopId: shopId}});
        return stockLogs;
    }

    static async stockLogForPurchaseEvent(stockLogParams, shop) {
        const stockLog = await StockLog.create({
            id: uuidv4(),
            type: 'STOCK_PURCHASED',
            ...stockLogParams,
        })
        await shop.addStockLog(stockLog);
        return stockLog;
    }

    static async stockLogForAdjustEvent(stockLogParams, shop) {
        const stockLog = await StockLog.create({
            id: uuidv4(),
            type: 'STOCK_ADJUSTED',
            ...stockLogParams,
        });
        await shop.addStockLog(stockLog);
        return stockLog;
    }

    static async stockLogForMoveInEvent(stockLogParams, shop) {
        const stockLog = await StockLog.create({
            id: uuidv4(),
            type: 'STOCK_MOVE_IN',
            ...stockLogParams,
        })
        await shop.addStockLog(stockLog);
        return stockLog;
    }

    static async stockLogForMoveOutEvent(stockLogParams, shop) {
        const stockLog = await StockLog.create({
            id: uuidv4(),
            type: 'STOCK_MOVE_OUT',
            ...stockLogParams,
        })
        await shop.addStockLog(stockLog);
        return stockLog;
    }

    static async stockLogForBillingEvent(stockLogParams, shop) {
        const stockLog = await StockLog.create({
            id: uuidv4(),
            type: 'STOCK_USED_IN_BILL',
            ...stockLogParams,
        })
        await shop.addStockLog(stockLog);
        return stockLog;
    }

    static async getPurchasedMaterials({shopId, startDate, endDate}) {
        startDate += 'T00:00:00.000Z'
        endDate += 'T23:59:59.000Z'
        const stockLogs = await StockLog.findAll({
            where: {ShopId: shopId, type: 'STOCK_PURCHASED', date: { [Op.between]: [startDate, endDate]}},
            include: [
                {model: Stock, include: [Store] }
            ],
        });
        return stockLogs;
    }
    
    static async getStockList({ shopId, date }) {
        date += 'T23:59:59.000Z';
        console.log(date);
        // Verify if the shopId is correct
        await ShopService.getShopById(shopId);

        const stockList = await StockLog.findAll({
            where: { ShopId: shopId, date: {[Op.lte]: date }},
            order: [['createdAt', 'DESC']],
            include: [
                {model: Stock, include: [Store] }
            ],
        });
        
        // Loop over the results and only consider the top result BECAUSE OF "DESC" order of "createdAt" column
        const stockFoundMap = {};
        const finalResultsArray = [];
        stockList.map(rec => {
            if (!stockFoundMap[rec.StockId]) {
                stockFoundMap[rec.StockId] = true;
                finalResultsArray.push(rec);
            } else {
                console.log('Stock already traversed');
            }
        })
        return finalResultsArray;
    }
}

module.exports = StockLogService;
