const { sequelize, Expense, ExpenseCategory, Store, Stock, StockLog, Shop, Bill, Company, Attendance, Employee, SellingItemsLog,MenuItem, MenuItemCategory, Session } = require("../models");
const SessionService  = require("../services/SessionService");
const ShopService  = require("../services/ShopService");

const { Op, fn, col } = require("sequelize");
const utils = require('./utils');

class DashboardService {

    static async todayExpense(shopId,companyId){
        if(companyId){
            let total=0;
            const shops = await Shop.findAll({ where: { CompanyId: companyId } })
            if(shops.length > 0){
                for(const shop of shops){
                    let t=0;
                    
                    const dateTime = await utils.StartAndEndDateManySessions(shop.id);
                    
                    if(!dateTime.empty){
    
                        const expenses = await Expense.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
                        
                        for(const expense of expenses){
                            t = t + expense.cost*1
                        }
                        total = total+ t;
                    }
                }
            }
            return {total};
        }else{
            
            const dateTime = await utils.StartAndEndDateManySessions(shopId);
        
            let total = 0
            if(!dateTime.empty){
                const expenses = await Expense.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
                for(const expense of expenses){
                    total = total + expense.cost*1
                }
            }
            
            return {total};
        }
    }

    static async lastSessionExpense(shopId,companyId){
        if(companyId){
            let total=0;
            const shops = await Shop.findAll({ where: { CompanyId: companyId } })
            if(shops.length > 0){
                for(const shop of shops){
                    let t=0;

                    const dateTime = await utils.StartAndEndDateLastSession(shop.id);
                    
                    if(!dateTime.empty){

                        const expenses = await Expense.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
        
                        for(const expense of expenses){
                            t = t + expense.cost*1
                        }
                        total = total+ t;
                    }
                    
                }
            } return {total};
        }else{
           
            let total = 0
            const dateTime = await utils.StartAndEndDateLastSession(shopId);

            if(!dateTime.empty){
                const expenses = await Expense.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
                
                for(const expense of expenses){
                    total = total + expense.cost*1
                }
            }
            return {total};
        }
    }

    static async todayBills(shopId,companyId){
        if(companyId){
            let total=0;
            let count=0;
            const shops = await Shop.findAll({ where: { CompanyId: companyId } })
            if(shops.length > 0){
                for(const shop of shops){
                    let t=0;
                    let c=0;


                    const dateTime = await utils.StartAndEndDateManySessions(shop.id);
                    
                    if(!dateTime.empty){
                       

                        const bills = await Bill.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
    
                        for(const bill of bills){
                            t = t + bill.totalAmount*1
                            c = c + 1
                        }
                        total = total + t;
                        count = count + c;
                    }
                }
            }
            return {total,count};
        }else{
            
            let count=0;
            let total = 0;

            const dateTime = await utils.StartAndEndDateManySessions(shopId);

            if(!dateTime.empty){
                const bills = await Bill.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
                    
                for(const bill of bills){
                    total = total + bill.totalAmount*1
                    count = count+1
                }
            }
        
            
            return {total,count};
        }
    }

    static async lastSessionBill(shopId,companyId){
        if(companyId){
            let total=0;
            let count=0;
            const shops = await Shop.findAll({ where: { CompanyId: companyId } })
            if(shops.length > 0){
                for(const shop of shops){
                    let t=0;
                    let c=0;
                    const dateTime = await utils.StartAndEndDateLastSession(shop.id);
                    
                    if(!dateTime.empty){

                        const bills = await Bill.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
    
                        for(const bill of bills){
                            t = t + bill.totalAmount*1
                            c = c + 1
                        }
                        total = total + t;
                        count = count + c;
                    }
                }
            }
            return {total,count};
        }else{
            const dateTime = await utils.StartAndEndDateLastSession(shopId);
            
            let count=0;
            let total = 0;
            if(!dateTime.empty){
    
                const bills = await Bill.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
        
                for(const bill of bills){
                    total = total + bill.totalAmount*1
                    count = count+1
                }
            }
           
            return {total,count};
        }
    }

    static async currentEmployees(shopId,companyId) {
        if(companyId){
            let totalClockIn=0;
            let totalClockOut=0;
            let employees=0;
            const shops = await Shop.findAll({ where: { CompanyId: companyId }, include:[Employee] })
            if(shops.length > 0){
                for(const shop of shops){
                    let cIn =0;
                    let cOut=0;
                    employees = employees + shop.Employees.length
                    const dateTime = await utils.StartAndEndDateManySessions(shop.id);
                    
                    if(!dateTime.empty){

                        const attendances = await Attendance.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
    
                        for(const attendance of attendances){
                            if(attendance.clockInTime && !attendance.clockOutTime){
                                cIn = cIn + 1;
                            }
                            if(attendance.clockInTime && attendance.clockOutTime){
                                cOut = cOut + 1;
                            }
                        }
                        totalClockIn = totalClockIn + cIn;
                        totalClockOut = totalClockOut + cOut;
                    }
                }
            }
            return {totalClockIn,totalClockOut,employees};
        }else{
            const dateTime = await utils.StartAndEndDateManySessions(shopId);
                
            let totalClockIn=0;
            let totalClockOut=0;
            let employees;
            const shop = await Shop.findOne({ where: { id: shopId }, include:[Employee] })
            shop.Employees ? employees = shop.Employees.length : employees = 0
            if(!dateTime.empty){
                
                const attendances = await Attendance.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
                
                for(const attendance of attendances){
                    if(attendance.clockInTime && !attendance.clockOutTime){
                        totalClockIn = totalClockIn + 1;
                    }
                    if(attendance.clockInTime && attendance.clockOutTime){
                        totalClockOut = totalClockOut + 1;
                    }
                }
                
            }
            return {totalClockIn,totalClockOut,employees};
        }
    }

    
    static async getTopSellingItemsToday(shopId) {
        let menuItemsWithSoldQuantities=[];
        if(shopId){
            if(!shopId) throw Error('Shop id required.')
            const shop = await Shop.findByPk(shopId);
            if(!shop) throw Error('Invalid shop id required.')
    
            const dateTime = await utils.StartAndEndDateManySessions(shop.id);
                    
            if(!dateTime.empty){
        
                menuItemsWithSoldQuantities = await SellingItemsLog.findAll({
                    where: {
                        ShopId: shopId,
                        createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]}
                    },
                    include: [
                        {model: MenuItem, attributes:['name'], include: { model: MenuItemCategory, attributes:['name']} }
                    ],
                    attributes: ['MenuItemId', [fn('sum', col('quantity')), 'quantity']],
                    group: ['SellingItemsLog.MenuItemId', 'MenuItem.id', "MenuItem->MenuItemCategory.id"],
                    // only top 5
                })
            }

        }

        const compare = ( a, b ) => {
            if ( a.quantity*1 > b.quantity*1 ){
              return -1;
            }
            if ( a.quantity*1 < b.quantity*1 ){
              return 1;
            }
            return 0;
        }
       
        return {menuItemsWithSoldQuantities: menuItemsWithSoldQuantities.sort(compare)};
    }

    static async getTopSellingItemsLastSessionToday(shopId) {
        let menuItemsWithSoldQuantities=[];
        if(shopId){
            if(!shopId) throw Error('Shop id required.')
            const shop = await Shop.findByPk(shopId);
            if(!shop) throw Error('Invalid shop id required.')
    
            const dateTime = await utils.StartAndEndDateLastSession(shop.id);
                    
            if(!dateTime.empty){
        
                menuItemsWithSoldQuantities = await SellingItemsLog.findAll({
                    where: {
                        ShopId: shopId,
                        createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]}
                    },
                    include: [
                        {model: MenuItem, attributes:['name'], include: { model: MenuItemCategory, attributes:['name']} }
                    ],
                    attributes: ['MenuItemId', [fn('sum', col('quantity')), 'quantity']],
                    group: ['SellingItemsLog.MenuItemId', 'MenuItem.id', "MenuItem->MenuItemCategory.id"],
                })
            }

        }

        const compare = ( a, b ) => {
            if ( a.quantity*1 > b.quantity*1 ){
              return -1;
            }
            if ( a.quantity*1 < b.quantity*1 ){
              return 1;
            }
            return 0;
        }

        return {menuItemsWithSoldQuantities: menuItemsWithSoldQuantities.sort(compare)};
    }

    static async getPurchasedMaterialsToday(shopId) {
        let stockLogsTab=[];
        if(shopId){
            if(!shopId) throw Error('Shop id required.')
            const shop = await Shop.findByPk(shopId);
            if(!shop) throw Error('Invalid shop id required.')
            let stockLogs=[];
            
            const dateTime = await utils.StartAndEndDateManySessions(shop.id);
                    
            if(!dateTime.empty){
               
                stockLogs = await StockLog.findAll({
                    where: {ShopId: shopId, type: 'STOCK_PURCHASED', date: { [Op.between]: [dateTime.startDate, dateTime.endDate]}},
                    attributes: ['stockChangeQuantity','price','highPrice'],
                    include: [
                        {model: Stock, attributes:['materialName'], include: {model: Store, attributes:['name']} }
                    ],
                });

                
                for(const el of stockLogs){
                    let price = el.dataValues.price * el.dataValues.stockChangeQuantity;
                    stockLogsTab.push({ highPrice: el.dataValues.highPrice, stockChangeQuantity: el.dataValues.stockChangeQuantity, price: price,  materialName: el.dataValues.materialName, storeName: el.dataValues.Stock.Store.name});
                }

                console.log(stockLogsTab);

            }

        }

        const compare = ( a, b ) => {
            if ( a.stockChangeQuantity*1 > b.stockChangeQuantity*1 ){
              return -1;
            }
            if ( a.stockChangeQuantity*1 < b.stockChangeQuantity*1 ){
              return 1;
            }
            return 0;
        }

        return {stockLogsTab: stockLogsTab.sort(compare)};
    }
    

    static async getPurchasedStockLastSession(shopId) {
        let stockLogsTab=[];
        if(shopId){

            if(!shopId) throw Error('Shop id required.')
            const shop = await Shop.findByPk(shopId);
            if(!shop) throw Error('Invalid shop id required.')
            let stockLogs=[];
            
            const dateTime = await utils.StartAndEndDateManySessions(shop.id);
                    
            if(!dateTime.empty){
               
                stockLogs = await StockLog.findAll({
                    where: {ShopId: shopId, type: 'STOCK_PURCHASED', date: { [Op.between]: [dateTime.startDate, dateTime.endDate]}},
                    attributes: ['stockChangeQuantity','price','highPrice'],
                    include: [
                        {model: Stock, attributes:['materialName'], include: {model: Store, attributes:['name']} }
                    ],
                });
    
                for(const el of stockLogs){
                    let price = el.dataValues.price * el.dataValues.stockChangeQuantity;
                    stockLogsTab.push({ highPrice: el.dataValues.highPrice, stockChangeQuantity: el.dataValues.stockChangeQuantity, price: price,  materialName: el.dataValues.materialName, storeName: el.dataValues.Stock.Store.name});
                }
    
                console.log(stockLogsTab);
            }
        }

        const compare = ( a, b ) => {
            if ( a.stockChangeQuantity*1 > b.stockChangeQuantity*1 ){
              return -1;
            }
            if ( a.stockChangeQuantity*1 < b.stockChangeQuantity*1 ){
              return 1;
            }
            return 0;
        }

        return {stockLogsTab: stockLogsTab.sort(compare)};
    }

    static async getStockList(shopId) {
        let stockListTab =[];
        if(shopId){
            const date = new Date().toISOString().substring(0,10)+'T23:59:59.000Z';
            console.log(date);
            // Verify if the shopId is correct
            await ShopService.getShopById(shopId);
            
            const stockList = await StockLog.findAll({ //change to stock
                where: { ShopId: shopId, date: {[Op.lte]: date }},
                attributes:['highPrice','id'],
                order: [['createdAt', 'DESC']],
                distinct: true,
                include: [
                    {model: Stock, attributes:['materialName','currentStock'], include: {model: Store, attributes:['name'], group: [['name']]},order:[['currentStock']] }
                ],
            });
            
    
           
            for(const el of stockList){
                let obj = { id: el.id, materialName: el.materialName, currentStock: el.currentStock, storeName: el.Stock.Store.name, highPrice: el.highPrice }
                stockListTab.push(obj);
            }
        }

        

        const compare = ( a, b ) => {
            if ( a.currentStock*1 > b.currentStock*1 ){
              return -1;
            }
            if ( a.currentStock*1 < b.currentStock*1 ){
              return 1;
            }
            return 0;
        }
       
        return stockListTab.sort(compare);
    }

    static async getStockListTotal(shopId,companyId) {
        
        if(companyId){
            let stocks=[];

            const shops = await Shop.findAll({ where: { CompanyId: companyId } });
            if(shops != null && shops.length > 0){
                const date = new Date().toISOString().substring(0,10)+'T23:59:59.000Z';
                let stockListTab=[];
                let materialNames=[];
                let stores=[];
                for(const shop of shops ){
            
                    /*const stockList = await StockLog.findAll({
                        where: { ShopId: shop.id, date: {[Op.lte]: date }},
                        attributes:['highPrice'],
                        order: [['createdAt']],
                        distinct: true,
                        include: [
                            {model: Stock, attributes:['materialName','currentStock'], include: {model: Store, attributes:['name'], group: [['name']]},order:[['currentStock']] }
                        ],
                    });*/


                    const stockList = await Stock.findAll({
                        where: { ShopId: shop.id, createdAt: {[Op.lte]: date }},
                        attributes:['materialName','currentStock'],
                        include: {model: Store, attributes:['name'], group: [['name']]},
                        order:[['currentStock']]
                    });

                    
                    for(const el of stockList){
                        let obj = { materialName: el.materialName, currentStock: el.currentStock, storeName: el.Store.name }
                        stockListTab.push(obj);
                        materialNames.push(el.materialName)
                    }

                    
                }

                    for(const name of new Set(materialNames)){
                        stocks.push({ materialName: name });
                    }

                    stores = await Store.findAll({ attributes:['name'], where: { CompanyId: companyId } });

                    for(const store of stores){
                        stocks = stocks.map(el => {
                            let obj={}
                            obj[store.name]=0
                            return { ...el, ...obj }
                        })
                    }

                    console.log(stocks);

                    for(const el of stockListTab){
                        for(let i=0; i<stocks.length;i++){
                            
                            if(el.materialName == stocks[i].materialName){
                                let obj = {...stocks[i]}
                                if(el.storeName in obj){
                                    obj[el.storeName] = obj[el.storeName]+(el.currentStock*1)
                                }else{
                                    obj[el.storeName] = el.currentStock*1
                                }
                            
                                stocks.splice(i,1,obj)
                            }
                            
                        }
                    }
                    
            }
            /*const compare = ( a, b ) => {
                if ( a.total*1 > b.total*1 ){
                  return -1;
                }
                if ( a.total*1 < b.total*1 ){
                  return 1;
                }
                return 0;
            }*/
            
            return stocks//.sort(compare).slice(0, 9);
            
        }else{
            let stocks=[];
            let stockListTab=[];
            if(shopId){
                
                const date = new Date().toISOString().substring(0,10)+'T23:59:59.000Z';
                console.log(date);
                // Verify if the shopId is correct
                const shop = await ShopService.getShopById(shopId);
                
                /*const stockList = await StockLog.findAll({
                    where: { ShopId: shopId, date: {[Op.lte]: date }},
                    attributes:['highPrice'],
                    order: [['createdAt']],
                    distinct: true,
                    include: [
                        {model: Stock, attributes:['materialName','currentStock'], include: {model: Store, attributes:['name'], group: [['name']]},order:[['currentStock']] }
                    ],
                });*/

                const stockList = await Stock.findAll({
                    where: { ShopId: shop.id, createdAt: {[Op.lte]: date }},
                    attributes:['materialName','currentStock'],
                    include: {model: Store, attributes:['name'], group: [['name']]},
                    order:[['currentStock']]
                })
                
        
                let materialNames=[];
                for(const el of stockList){
                    let obj = { materialName: el.materialName, currentStock: el.currentStock, storeName: el.Store.name }
                    stockListTab.push(obj);
                    materialNames.push(el.materialName)
                }

                
                for(const name of new Set(materialNames)){
                    stocks.push({ materialName: name });
                }


                let stores = await Store.findAll({ attributes:['name'], where: { CompanyId: shop.CompanyId } });

                for(const store of stores){
                    stocks = stocks.map(el => {
                        let obj={}
                        obj[store.name]=0
                        return { ...el, ...obj }
                    })
                }

                for(const el of stockListTab){
                    for(let i=0; i<stocks.length;i++){
                        
                        if(el.materialName == stocks[i].materialName){
                            let obj = {...stocks[i]}
                            if(el.storeName in obj){
                                obj[el.storeName] = obj[el.storeName]+(el.currentStock*1)
                            }else{
                                obj[el.storeName] = el.currentStock*1
                            }
                        
                            stocks.splice(i,1,obj)
                        }
                        
                    }
                }

            }

            /*const compare = ( a, b ) => {
                if ( a.total*1 > b.total*1 ){
                return -1;
                }
                if ( a.total*1 < b.total*1 ){
                return 1;
                }
                return 0;
            }*/

        
            return stocks//.sort(compare).slice(0, 9);
        }
    }

    static dateRange = (startDate,endDate) => {
        const date = new Date(startDate)
        const end = new Date(endDate)

        let tab=[];
        tab.push(date.toISOString().substring(0,10))
        let i=0;
        while(new Date(date.setDate(date.getDate() + 1)) <= end){
            tab.push(new Date(date).toISOString().substring(0,10));
        }
        return tab;
    }

    static async trendExpense(shopId,companyId,startDate,endDate){
        if(!startDate || !endDate){
            throw Error('Invalid date range');
        }
        const dates = this.dateRange(startDate,endDate);
        let trend = [];
        for(const d of dates){
            if(companyId){
                let total=0;
                const shops = await Shop.findAll({ where: { CompanyId: companyId } })
                if(shops.length > 0){
                    for(const shop of shops){
                        let t=0;
                        const dateTime = await utils.StartAndEndDateManySessionsByManyDays(shop.id,d);
                    
                        if(!dateTime.empty){
        
                            const expenses = await Expense.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
        
                            for(const expense of expenses){
                                t = t + expense.cost*1
                            }
                            total = total+ t;
                        }
                    }
                }
                trend.push({date: d,total});
            }else{
                const dateTime = await utils.StartAndEndDateManySessionsByManyDays(shopId,d);
                let total = 0
                if(!dateTime.empty){
            
                    const expenses = await Expense.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
            
                    
                    for(const expense of expenses){
                        total = total + expense.cost*1
                    }
                }
                
                trend.push({date: d,total});
            }
        }
        return trend;
    }

    
    static async trendDashboard(shopId,companyId,startDate,endDate){
        if(!startDate || !endDate){
            throw Error('Invalid date range');
        }
        const dates = this.dateRange(startDate,endDate);
        let trend = [];
        for(const d of dates){
            if(companyId){
                let total=0;
                let count=0;
                let totalExpense=0;
                const shops = await Shop.findAll({ where: { CompanyId: companyId } })
                if(shops.length > 0){
                    for(const shop of shops){
                        let t=0;
                        let c=0;
                        let p=0;
                        const dateTime = await utils.StartAndEndDateManySessionsByManyDays(shop.id,d);
                        if(!dateTime.empty){

                            const expenses = await Expense.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
        
                            for(const expense of expenses){
                                p = p + expense.cost*1
                            }
                            totalExpense = totalExpense+ p;

                            const bills = await Bill.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
        
                            for(const bill of bills){
                                t = t + bill.totalAmount*1
                                c = c + 1
                            }
                            total = total + t;
                            count = count + c;
                        }
                    }
                }
                trend.push({date: d,total,count,expense: totalExpense});
            }else{
                const dateTime = await utils.StartAndEndDateManySessionsByManyDays(shopId,d);
                let count=0;
                let total = 0;
                let totalExpense=0;
                if(!dateTime.empty){
        
                    const expenses = await Expense.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
        
                    for(const expense of expenses){
                        totalExpense = totalExpense + expense.cost*1
                    }
        
                    const bills = await Bill.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
            
                    
                    for(const bill of bills){
                        total = total + bill.totalAmount*1
                        count = count+1
                    }
                }
                
                trend.push({date: d,total,count,expense: totalExpense});
            }
        }
        return trend;
    }

    static async getSellingItemsTrends(shopId,companyId,startDate,endDate) {
        console.log("im here if you dont see me i will call sarrourti for dealing with you")
        if(!startDate || !endDate){
            throw Error('Invalid date range');
        }
        const dates = this.dateRange(startDate,endDate);
        let trend = [];
        for(const d of dates){
            let menuItemsWithSoldQuantities=[];
            if(shopId){
                if(!shopId) throw Error('Shop id required.')
                const shop = await Shop.findByPk(shopId);
                if(!shop) throw Error('Invalid shop id required.')
        
                const sessions = await SessionService.getAllSessions(shopId,d,d);
                //const dateTime = await utils.StartAndEndDateManySessions(shopId);
                console.log(sessions,d);
                if(sessions.length > 0){
                    const createdAt = sessions[0].createdAt
                    const endedAt = sessions[sessions.length-1].endedAt || new Date(d).toISOString().substring(0,10)+'T23:59:59.000Z'
            
                    console.log('****************************************************************************')
                    menuItemsWithSoldQuantities = await SellingItemsLog.findAll({
                        where: {
                            ShopId: shopId,
                            createdAt: {[Op.between]: [createdAt, endedAt]}
                        },
                        include: [
                            {model: MenuItem, attributes:['name'], include: { model: MenuItemCategory, attributes:['name']} }
                        ],
                        attributes: ['MenuItemId', [fn('sum', col('quantity')), 'quantity']],
                        group: ['SellingItemsLog.MenuItemId', 'MenuItem.id', "MenuItem->MenuItemCategory.id"],
                        limit: 5
                    })
                    console.log('***********************************',menuItemsWithSoldQuantities,'*****************************************')
                }

            }

            const compare = ( a, b ) => {
                if ( a.quantity*1 > b.quantity*1 ){
                  return -1;
                }
                if ( a.quantity*1 < b.quantity*1 ){
                  return 1;
                }
                return 0;
            }

            trend.push({date: d,menuItemsWithSoldQuantities: menuItemsWithSoldQuantities.sort(compare)});
        }
       
        return trend;
    }

    static async trendBills(shopId,companyId,startDate,endDate){
        if(!startDate || !endDate){
            throw Error('Invalid date range');
        }
        const dates = this.dateRange(startDate,endDate);
        let trend = [];
        for(const d of dates){
            if(companyId){
                let total=0;
                let count=0;
                const shops = await Shop.findAll({ where: { CompanyId: companyId } })
                if(shops.length > 0){
                    for(const shop of shops){
                        let t=0;
                        let c=0;
                        const dateTime = await utils.StartAndEndDateManySessionsByManyDays(shop.id,d);
                
                        if(!dateTime.empty){
                        
                            const bills = await Bill.findAll({where: {ShopId: shop.id, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
        
                            for(const bill of bills){
                                t = t + bill.totalAmount*1
                                c = c + 1
                            }
                            total = total + t;
                            count = count + c;
                        }
                    }
                }
                trend.push({date: d,total,count});
            }else{
                const dateTime = await utils.StartAndEndDateManySessionsByManyDays(shopId,d);
                
                        
                let count=0;
                let total = 0;
                if(!dateTime.empty){
                  
        
                    const bills = await Bill.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [dateTime.startDate, dateTime.endDate]} }});
            
                    
                    for(const bill of bills){
                        total = total + bill.totalAmount*1
                        count = count+1
                    }
                }
                
                trend.push({date: d,total,count});
            }
        }
        return trend;
    }

    static async dashboard(shopId,companyId){
        const todayExpense = await DashboardService.todayExpense(shopId, companyId);
        const lastSessionExpense = await DashboardService.lastSessionExpense(shopId, companyId);
        const todayBills = await DashboardService.todayBills(shopId, companyId);
        const lastSessionBill = await DashboardService.lastSessionBill(shopId, companyId);
        const currentEmployees = await DashboardService.currentEmployees(shopId, companyId);
        const getTopSellingItemsToday = await DashboardService.getTopSellingItemsToday(shopId);
        const getTopSellingItemsLastSessionToday = await DashboardService.getTopSellingItemsLastSessionToday(shopId);
        //const getPurchasedStockToday = await DashboardService.getPurchasedMaterialsToday(shopId);
        //const getPurchasedStockLastSession = await DashboardService.getPurchasedStockLastSession(shopId);
        const mostDepletedStocksToday = await DashboardService.getStockList(shopId);

        return {
            todayExpense,
            lastSessionExpense,
            todayBills,
            lastSessionBill,
            currentEmployees,
            getTopSellingItemsToday,
            getTopSellingItemsLastSessionToday,
            //getPurchasedStockToday,
            //getPurchasedStockLastSession,
            mostDepletedStocksToday
        }
    }
    

    /*static async currentEmployees(shopId,companyId) {
       if(companyId){
           let total = 0;
           const company = await Company.findOne({ where: { id: companyId }, include:[Shop] });
           if(company.Shops.length > 0){
               for(const shop of company.Shops){
                    let count = await Attendance.count({ where:{ ShopId: shop.id, clockInTime: {[Op.ne]: null}, clockOutTime: null } });
                    total = total + count
               }
           }
           return {total};
       }else{
        let total=0;
        let count = await Attendance.count({ where:{ ShopId: shopId, clockInTime: {[Op.ne]: null}, clockOutTime: null } });
        total = total + count;
        return {total};
    }
    }
    
     static async getStockListTotal(shopId,companyId) {
        
        if(companyId){
            let stocks=[];

            const shops = await Shop.findAll({ where: { CompanyId: companyId } });
            if(shops != null && shops.length > 0){
                const date = new Date().toISOString().substring(0,10)+'T23:59:59.000Z';
                let stockListTab=[];
                let materialNames=[];
                let stores=[];
                for(const shop of shops ){
            
                    const stockList = await StockLog.findAll({
                        where: { ShopId: shop.id, date: {[Op.lte]: date }},
                        attributes:['highPrice'],
                        order: [['createdAt']],
                        distinct: true,
                        include: [
                            {model: Stock, attributes:['materialName','currentStock'], include: {model: Store, attributes:['name'], group: [['name']]},order:[['currentStock']] }
                        ],
                    });

                    
                    for(const el of stockList){
                        let obj = { materialName: el.materialName, currentStock: el.currentStock, storeName: el.Store.name, highPrice: el.highPrice }
                        stockListTab.push(obj);
                        materialNames.push(el.materialName)
                    }

                    
                }

                    for(const name of new Set(materialNames)){
                        stocks.push({ materialName: name, total: 0 });
                    }

                    stores = await Store.findAll({ attributes:['name'], where: { CompanyId: companyId } });

                    for(const store of stores){
                        stocks = stocks.map(el => {
                            let obj={}
                            obj[store.name]=0
                            return { ...el, ...obj }
                        })
                    }

                    console.log(stocks);

                    for(const el of stockListTab){
                        for(let i=0; i<stocks.length;i++){
                            
                            if(el.materialName == stocks[i].materialName){
                                let obj = {...stocks[i]}
                                if(el.storeName in obj){
                                    obj[el.storeName] = obj[el.storeName]+(el.currentStock*1)
                                    obj.total = obj.total+(el.currentStock*1)
                                }else{
                                    obj[el.storeName] = el.currentStock*1
                                    obj.total = obj.total+(el.currentStock*1)
                                }
                            
                                stocks.splice(i,1,obj)
                            }
                            
                        }
                    }
                    
            }
            const compare = ( a, b ) => {
                if ( a.total*1 > b.total*1 ){
                  return -1;
                }
                if ( a.total*1 < b.total*1 ){
                  return 1;
                }
                return 0;
            }
            
            return stocks.sort(compare).slice(0, 9);
            
        }else{
            let stocks=[];
            let stockListTab=[];
            if(shopId){
                
                const date = new Date().toISOString().substring(0,10)+'T23:59:59.000Z';
                console.log(date);
                // Verify if the shopId is correct
                const shop = await ShopService.getShopById(shopId);
                
                const stockList = await StockLog.findAll({
                    where: { ShopId: shopId, date: {[Op.lte]: date }},
                    attributes:['highPrice'],
                    order: [['createdAt']],
                    distinct: true,
                    include: [
                        {model: Stock, attributes:['materialName','currentStock'], include: {model: Store, attributes:['name'], group: [['name']]},order:[['currentStock']] }
                    ],
                });
                
        
                let materialNames=[];
                for(const el of stockList){
                    let obj = { materialName: el.materialName, currentStock: el.currentStock, storeName: el.Store.name, highPrice: el.highPrice }
                    stockListTab.push(obj);
                    materialNames.push(el.materialName)
                }

                
                for(const name of new Set(materialNames)){
                    stocks.push({ materialName: name, total: 0 });
                }

                let stores = await Store.findAll({ attributes:['name'], where: { CompanyId: shop.CompanyId } });

                for(const store of stores){
                    stocks = stocks.map(el => {
                        let obj={}
                        obj[store.name]=0
                        return { ...el, ...obj }
                    })
                }

                for(const el of stockListTab){
                    for(let i=0; i<stocks.length;i++){
                        
                        if(el.materialName == stocks[i].materialName){
                            let obj = {...stocks[i]}
                            if(el.storeName in obj){
                                obj[el.storeName] = obj[el.storeName]+(el.currentStock*1)
                                obj.total = obj.total+(el.currentStock*1)
                            }else{
                                obj[el.storeName] = el.currentStock*1
                                obj.total = obj.total+(el.currentStock*1)
                            }
                        
                            stocks.splice(i,1,obj)
                        }
                        
                    }
                }

            }

            const compare = ( a, b ) => {
                if ( a.total*1 > b.total*1 ){
                return -1;
                }
                if ( a.total*1 < b.total*1 ){
                return 1;
                }
                return 0;
            }

        
            return stocks.sort(compare).slice(0, 9);
        }
    }
    
    
    */

}

module.exports = DashboardService;