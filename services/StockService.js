const { Shop, Stock, Store, StockLog, Employee, Material } = require("../models");
const ShopService = require("../services/ShopService");
const StoreService = require("../services/StoreService");
const MaterialService = require("../services/MaterialService");
const StockLogService = require("../services/StockLogService");
const { v4: uuidv4 } = require('uuid');

class StockService {
    static async getStockById(stockId) {
        if (!stockId) {
            throw Error('Please select a Stock')
        }

        const stock = await Stock.findByPk(stockId);
        if(!stock) {
            throw Error('No stock found for the given stock id.')
        }
        return stock;
    }

    static async addStock(stockParams) {
        const {shopId, id, date, materialName, notes, newPurchase, storeId, price, units, employeeId, MaterialId } = stockParams;
        const shop = await ShopService.getShopById(shopId);
        const store = await StoreService.getStoreById(storeId);
        const employee = await ShopService.getEmployeeById(employeeId);
        const material = await MaterialService.getMaterialByNameOrId(materialName,MaterialId)

        if (isNaN(newPurchase) || !+newPurchase) {
            console.log(newPurchase)
            throw Error('Invalid value for units provided, must be non-zero number');
        }

        if (id) {
            const stock = await this.updateStock(stockParams);
            //employee.isDeletable = false;
            await employee.save();
            return stock;
        } else {
            const checkIfStockExists = await Stock.findOne({where: {materialName: material.name.toLowerCase(), StoreId: storeId, ShopId: shop.id}});
            if(checkIfStockExists)  throw Error('Trying to create a stock that already exists')
            //add details to stock details as well along with price.
            const stock = await Stock.create({
                id: uuidv4(),
                MaterialId: material.id,
                materialName: material.name.toLowerCase(),
                units,
                price: +(+price).toFixed(2),
                currentStock: newPurchase,
                StoreId: storeId
            });

            await StockLogService.stockLogForPurchaseEvent({
                date,
                existingStock: 0,
                updatedStock: newPurchase,
                stockChangeQuantity: newPurchase,
                notes,
                price: +(+price).toFixed(2),
                StockId: stock.id,
                EmployeeId: employeeId,
            }, shop);

            await shop.addStock(stock);

            store.isDeletable = false;
            await store.save();

            //employee.isDeletable = false;
            await employee.save();

            material.isDeletable = false;
            await material.save();

            return stock;
        }
    }

    static async adjustStock(stockParams) {
        const {shopId, id, date, existingStock, notes='', employeeId } = stockParams;
        const shop = await ShopService.getShopById(shopId);

        const employee = await ShopService.getEmployeeById(employeeId);

        const stock = await this.getStockById(id)

        await StockLogService.stockLogForAdjustEvent({
            date,
            existingStock: stock.currentStock,
            updatedStock: existingStock,
            stockChangeQuantity: parseFloat(stock.currentStock) - parseFloat(existingStock),
            price: +(+stock.price).toFixed(2),
            notes,
            StockId: stock.id,
            EmployeeId: employeeId,
        }, shop);

        stock.currentStock = existingStock;
        await stock.save();

        //employee.isDeletable = false;
        await employee.save();

        return stock;
    }

    static async moveStock(data) {
        let { moveToStore, selectedStock, date, stockMoveCount, notes='', shopId, employeeId } = data;
        stockMoveCount = isNaN(+stockMoveCount) ? 0 : +stockMoveCount;

        const shop = await ShopService.getShopById(shopId);
        // Find the stock
        const stock = await this.getStockById(selectedStock);

        // check if store exists for the given store id
        const nextStock = await StoreService.getStoreById(moveToStore);

        if(stock.id == nextStock.id){
            throw Error('You cannot move stock to the same store.')
        }

        if (!stockMoveCount) {
            throw Error('Add some non-zero value for the stocks')
        }
        // Stock more than the current stock count cannot be moved
        if (stock.currentStock < stockMoveCount) {
            throw Error('Cannot Move stock more than the current stock count!')
        }

        // Update the Given store
        const moveToStockExists = await Stock.findOne({where: {materialName: stock.materialName.toLowerCase(), StoreId: moveToStore}});
        if(moveToStockExists) {
            const moveStockExistingStocks = moveToStockExists.currentStock
            const totalPrice = parseFloat(moveToStockExists.price) * Math.abs(parseFloat(moveToStockExists.currentStock)) + parseFloat(stock.price) * parseFloat(stockMoveCount)
            const totalCount =  parseFloat(moveToStockExists.currentStock) + parseFloat(stockMoveCount);
            const avgPrice = totalPrice / totalCount;
            moveToStockExists.currentStock = totalCount
            moveToStockExists.price = avgPrice;
            moveToStockExists.save();
            // Add the stock log entry
            await StockLogService.stockLogForMoveInEvent({
                date,
                existingStock: moveStockExistingStocks,
                updatedStock: totalCount,
                newPurchase: parseFloat(stockMoveCount),
                price: +(+stock.price).toFixed(2),
                notes,
                StockId: moveToStockExists.id,
                EmployeeId: employeeId,
            }, shop);
        } else {
            //add details to stock details as well along with price.
            const newStock = await Stock.create({
                id: uuidv4(),
                materialName: stock.materialName.toLowerCase(),
                units: stock.units,
                price: +(+stock.price).toFixed(2),
                currentStock: stockMoveCount,
                StoreId: moveToStore,
            });
            await shop.addStock(newStock);
            // Adding the stock log entry
            await StockLogService.stockLogForMoveInEvent({
                date,
                existingStock: 0,
                updatedStock: parseFloat(stockMoveCount),
                stockChangeQuantity: parseFloat(stockMoveCount),
                price: +(+stock.price).toFixed(2),
                notes,
                StockId: newStock.id,
                EmployeeId: employeeId,
            }, shop);
        }

        // Update the Given Stock
        const moveFromStockExistingStocks = stock.currentStock;
        stock.currentStock = stock.currentStock - stockMoveCount;
        await stock.save();

        // Add the entry in Stock Log
        await StockLogService.stockLogForMoveOutEvent({
            date,
            existingStock:moveFromStockExistingStocks,
            updatedStock: stock.currentStock,
            newPurchase: stockMoveCount,
            price: +(+stock.price).toFixed(2),
            notes,
            StockId: stock.id,
            EmployeeId: employeeId,
        }, shop);
        return stock;
    }

    static async getAllStocks(shopId) {
        const stocks = await Stock.findAll({where: {ShopId: shopId}, include: [Store]});
        return stocks;
    }

    static getNumber = (value) => {
        return isNaN(+value) ? 0 : +value;
    }

    static async updateStock(stockParams) {
        const {id, date, materialName, storeId, newPurchase, notes = '', price,shopId, units, employeeId } = stockParams;
        const stock = await Stock.findByPk(id);
        const store = await Store.findByPk(storeId);
        const material = await Material.findByPk(stock.MaterialId);
        let priceDiffForEmailAlert = material.priceDiffForEmailAlert;
        if(!material) {
            throw Error('material Id is required to add stock.')
        }
        if(storeId && !store ) {
            throw Error('Invalid store id provided.')
        }
        if (storeId !== stock.StoreId) {
            throw Error('Selected stock store and given store are different!')
        }
        if(!employeeId) {
            throw Error('Employee Id is required to add stock.')
        }
        
        const shop = await Shop.findByPk(shopId)
        const employee = await Employee.findByPk(employeeId)
        if (!employee) {
            throw Error('Invalid Employee provided')
        }
        const newStock = this.getNumber(stock.currentStock) + this.getNumber(newPurchase);

        await StockLogService.stockLogForPurchaseEvent({
            date,
            currentStock: stock.currentStock,
            updatedStock: newStock,
            stockChangeQuantity: newPurchase,
            price: +(+price).toFixed(2),
            notes,
            StockId: stock.id,
            EmployeeId: employeeId,
            highPrice: ((price - stock.price)*100 / stock.price ) >= parseInt(priceDiffForEmailAlert)
        }, shop);

        // Calculating the average price of the stock
        const totalPrice = parseFloat(stock.price) * Math.abs(parseFloat(stock.currentStock)) + parseFloat(price) * parseFloat(newPurchase)
        const avgPrice = totalPrice / (Math.abs(this.getNumber(stock.currentStock)) +  Math.abs(this.getNumber(newPurchase)));
        stock.materialName = materialName || stock.materialName;
        stock.currentStock = parseFloat(newStock);
        stock.StoreId = storeId || stock.StoreId;
        stock.price = +(+avgPrice).toFixed(2);
        await stock.save();
        //employee.isDeletable = false;
        await employee.save();
        return stock;
    }
}

module.exports = StockService;
