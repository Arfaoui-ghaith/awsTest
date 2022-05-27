const ShopService = require("./ShopService");
const StockLogService = require("./StockLogService");
const { Bill, Session, Employee, Table, MenuItem, Customer, Stock, PosSetup, SellingItemsLog, Unit } = require("../models");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { Op, QueryTypes } = require('sequelize');
const {sequelize} = require("../models");

class BillService {

    static createBillNumber(count){
        let s = count+""
        let i = 5-s.length
        for(let p=0; p<i; p++){
            s=0+s
        }
        return s;
    }

    static async createBill(billParams) {
        const { shopId, menuItems, methodOfPayment, totalAmount, sessionId, voided, employeeId, orderType, orderName, orderMetaData, notes, customerId } = billParams;

        if(!sessionId) {
            throw Error('No session id provided.')
        }
        if (!orderType || !orderName) {
            throw Error('Name and Type of Order are required to create bill')
        }
        if (!['DINE_IN', 'TAKE_AWAY', 'ONLINE_ORDER'].includes(orderType)) {
            throw Error('Invalid order type passed!')
        }

        const shop = await ShopService.getShopById(shopId)
        const employee = await ShopService.getEmployeeById(employeeId);
        const session = await Session.findByPk(sessionId);

        if(!session) {
            throw Error('Invalid Session id provided')
        }

        if(!employee) {
            throw Error('Invalid employee id provided')
        }
   
        if(!shop) {
            throw Error('Invalid shop id provided')
        }

        const bills = await Bill.count({ where: { ShopId: shop.id } });

        const  createBillNumber = (count) => {
            let s = count+""
            let i = 5-s.length
            for(let p=0; p<i; p++){
                s=0+s
            }
            return s;
        }

        //let billNumber = `${new Date().getTime()}`
        let billNumber;
        if(shop.PosSetup && shop.PosSetup.billSeries){
            billNumber = `${shop.PosSetup.billSeries}-${createBillNumber(bills+1)}`
        }else{
            billNumber = `${shop.name}-${createBillNumber(bills+1)}`
        }
        // Check if the default store to pick materials from is configured or not
        /*const posSetupRecord =  await PosSetup.findOne({ where: { ShopId: shopId }});
        let storeToPickMaterial = posSetupRecord ? posSetupRecord.StoreId : null;
        if (!storeToPickMaterial) {
            throw Error('add a default store to pick materials before adding bills!');
        }*/
        let billValues = {
            ...billParams,
            id: uuidv4(),
            billNumber,
            menuItems,
            methodOfPayment,
            totalAmount,
            orderType,
            orderName,
            orderMetaData,
            voided: voided,
            notes,
        }
        /*if (customerId) {
            const customer = await Customer.findByPk(customerId);
            if (!customer) {
                throw Error('Invalid Customer Id is provided');
            }
            customer.isDeletable = false;
            await customer.save();
            billValues.CustomerId = customerId;
        }*/

        const bill = await Bill.build(billValues)
        await session.addBill(bill);
        await employee.addBill(bill);
        await shop.addBill(bill);

        

        bill.SessionId = sessionId ? sessionId : null;
        bill.ShopId = shopId ? shopId : null
        bill.CustomerId = customerId ? customerId : null; 
        //employee.isDeletable = false;
        await employee.save();

      

        
        // If the order is DINE_IN then update the "tables" table
        if (orderType === 'DINE_IN') {
            const table = await Table.findOne({ where: { name: orderName }});
            if(!table) {
                throw Error('No Tables for the order name given')
            }
            table.isDeletable = false;
            await table.save();
        }
        // For all the materials loop through them and make them non deletable
        let materials = [];
        let extraUsedMaterialsMap = {};
        if(menuItems){
            for (const {id: menuItemId, qty} of menuItems) {
                
                const menuItemRec = await MenuItem.findByPk(menuItemId);
                if(!menuItemRec){
                    throw Error('No menu items for the id given')

                }
                // update the stock of attached store, and also note if the stock are needed to be refill!
                if(menuItemRec.materials){
                    menuItemRec.materials.map(mat => {
                        let menuItemQuantity;
                        if(!qty){
                            let menuItemQuantity = 1
                        }else{
                            menuItemQuantity = parseFloat(qty)
                        }
                        
                        materials.push(
                            {
                                name: mat.materialName,
                                id: mat.materialId,
                                quantity: parseFloat(mat.quantity),
                                menuItemQuantity,
                                unit: mat.units
                            }
                        );
                        
                        /*const materialCount = parseFloat(mat.quantity) * parseFloat(qty);
                        
                        
                            ? parseFloat(materials[mat.materialName]) + materialCount
                            : materialCount;*/
                    });
                    menuItemRec.isDeletable = false;
                    await menuItemRec.save();
                }
            // Add Row in the selling menu items log
                const sellingItemLog = await SellingItemsLog.create({
                    id: uuidv4(),
                    ShopId: shopId,
                    quantity: 1,
                    MenuItemId: menuItemId,
                    totalPrice: parseFloat(menuItemRec.sellingPrice) //* parseFloat(qty),
                });
                console.log('sellingItemLog => ', sellingItemLog)
            }
        }
        
        // We now have the materials and their quantity used in the bill
        if(materials){
            let shopStore = await ShopService.getPosSetupByShopId(shop.id);
            for (const material of materials) {
                let stockRec;
                const stockRecById = await Stock.findOne({where: { MaterialId: material.id, StoreId: shopStore.StoreId }});
                if(stockRecById){
                    stockRec = stockRecById;
                }else{
                    const stockRecByName = await Stock.findOne({where: { materialName: material.name, StoreId: shopStore.StoreId }});
                    if(stockRecByName){
                        stockRec = stockRecByName
                    }
                }
                if(!stockRec){
                    throw Error(`Stock not found for this material : ${material.name}`)
                }
                // TODO NEED TO CHECK FOR THE STOCK EXISTS FOR THE MATERIAL!!
                const stockExistingStocks = stockRec.currentStock;
                const updatedCount = parseFloat(stockRec.currentStock) - (parseFloat(material.quantity)*material.menuItemQuantity);
                if (updatedCount < 1) {
                    extraUsedMaterialsMap[material.name] = {updatedCount, message: `Current stock quantity of ${material.name} is running low and is ${updatedCount} ${material.unit}`};
                }
                stockRec.currentStock = updatedCount;
                stockRec.save();




                await StockLogService.stockLogForBillingEvent({
                    date: moment().format('MM-DD-YYYY'),
                    existingStock: stockExistingStocks,
                    updatedStock: updatedCount,
                    stockChangeQuantity: parseFloat(material.quantity),
                    notes: `Material used for billing the ${orderType} ${orderName ? ':' + orderName : '' }`,
                    price: stockRec.price,
                    StockId: stockRec.id,
                    EmployeeId: employeeId,
                }, shop);
            }
        }
        
        //return extraUsedMaterialsMap;
        console.log(extraUsedMaterialsMap);
        await bill.save();
        return {...bill.dataValues,menuItems,extraUsedMaterialsMap};
    }

    static async getAllBills(shopId, queryVariables) {
        let {sessionId, startDate, endDate, voided, employeeId} = queryVariables;
        let whereObj = {ShopId: shopId};
        if(sessionId) {
            whereObj = {...whereObj, ...{SessionId: sessionId}}
        }
        if(startDate) {
            startDate += 'T00:00:00.000Z'
            endDate += 'T23:59:59.000Z'
            whereObj = {...whereObj, ...{createdAt: {[Op.between]: [startDate, endDate]}}}
        }
        if(voided) {
            whereObj = {...whereObj, ...{voided: true}}
        }
        if(employeeId) {
            whereObj = {...whereObj, ...{EmployeeId: employeeId}}
        }
        return await Bill.findAll({where: whereObj, include: [Session, Employee, Customer]})
    }

    static async updateBill(billParams,billId) {
        const {menuItems, methodOfPayment, totalAmount, voided } = billParams;
        let bill = await Bill.findByPk(billId);
        if (!bill) {
            throw Error('Invalid bill id provided')
        }
        bill.menuItems = menuItems || bill.menuItems;
        // reduce stock here
        bill.methodOfPayment = methodOfPayment || bill.methodOfPayment;
        bill.totalAmount = totalAmount || bill.totalAmount;
        bill.voided = voided || bill.voided;
        await bill.save();
        return bill;
    }

    // to do delete bill
    static async deletelBill(billId,notes) {
        const bill = await Bill.findByPk(billId);
        if (!bill) {
            throw Error('No bill found for the given Id.')
        }
        if (bill.isDeletable) {
            return await Bill.update({isActive: false, notes}, { where: { id: billId },returning: true });
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the bill which are in action!');
        }
    }

    
    /*static async createBill(billParams) {
        const { shopId, menuItems, methodOfPayment, totalAmount, sessionId, voided, employeeId, orderType, orderName, orderMetaData, notes, customerId } = billParams;

        if(!sessionId) {
            throw Error('No session id provided.')
        }
        if (!orderType || !orderName) {
            throw Error('Name and Type of Order are required to create bill')
        }
        if (!['DINE_IN', 'TAKE_AWAY', 'ONLINE_ORDER'].includes(orderType)) {
            throw Error('Invalid order type passed!')
        }

        const shop = await ShopService.getShopById(shopId)
        const employee = await ShopService.getEmployeeById(employeeId);
        const session = await Session.findByPk(sessionId);

        if(!session) {
            throw Error('Invalid Session id provided')
        }

        if(!employee) {
            throw Error('Invalid employee id provided')
        }
   
        if(!shop) {
            throw Error('Invalid shop id provided')
        }
        // Check if the default store to pick materials from is configured or not
        /*const posSetupRecord =  await PosSetup.findOne({ where: { ShopId: shopId }});
        let storeToPickMaterial = posSetupRecord ? posSetupRecord.StoreId : null;
        if (!storeToPickMaterial) {
            throw Error('add a default store to pick materials before adding bills!');
        }//
        let billValues = {
            ...billParams,
            id: uuidv4(),
            billNumber: `${new Date().getTime()}${Math.floor(Math.random()*1000)}`,
            menuItems,
            methodOfPayment,
            totalAmount,
            orderType,
            orderName,
            orderMetaData,
            voided: voided,
            notes,
        }
        /*if (customerId) {
            const customer = await Customer.findByPk(customerId);
            if (!customer) {
                throw Error('Invalid Customer Id is provided');
            }
            customer.isDeletable = false;
            await customer.save();
            billValues.CustomerId = customerId;
        }//

        const bill = await Bill.create(billValues)
        /*await session.addBill(bill);
        await employee.addBill(bill);
        await shop.addBill(bill);

        

        bill.SessionId = sessionId ? sessionId : null;
        bill.ShopId = shopId ? shopId : null
        bill.CustomerId = customerId ? customerId : null; 
        employee.isDeletable = false;
        await employee.save();

        
        // If the order is DINE_IN then update the "tables" table
        if (orderType === 'DINE_IN') {
            const table = await Table.findOne({ where: { name: orderName }});
            if(!table) {
                throw Error('No Tables for the order name given')
            }
            table.isDeletable = false;
            await table.save();
        }
        // For all the materials loop through them and make them non deletable
        let materials = {};
        let extraUsedMaterialsMap = {};
        if(menuItems){
            for (const {id: menuItemId, qty} of menuItems) {
                
                const menuItemRec = await MenuItem.findByPk(menuItemId);
                if(!menuItemRec){
                    throw Error('No menu items for the id given')

                }
                // update the stock of attached store, and also note if the stock are needed to be refill!
                if(menuItemRec.materials){
                    menuItemRec.materials.map(mat => {
                        const materialCount = parseFloat(mat.quantity) * parseFloat(qty);
                        
                        materials[mat.materialName] = materials[mat.materialName]
                            ? parseFloat(materials[mat.materialName]) + materialCount
                            : materialCount;
                    });
                    menuItemRec.isDeletable = false;
                    await menuItemRec.save();
                }
            // Add Row in the selling menu items log
                const sellingItemLog = await SellingItemsLog.create({
                    id: uuidv4(),
                    ShopId: shopId,
                    quantity: qty,
                    MenuItemId: menuItemId,
                    totalPrice: parseFloat(menuItemRec.sellingPrice) * parseFloat(qty),
                });
                console.log('sellingItemLog => ', sellingItemLog)
            }
        }
        console.log("materials,",materials)
        // We now have the materials and their quantity used in the bill
        if(materials){
            for (const matName of Object.keys(materials)) {
                const stockRec = await Stock.findOne({where: { materialName: matName, StoreId: storeToPickMaterial }});
                // TODO NEED TO CHECK FOR THE STOCK EXISTS FOR THE MATERIAL!!
                const stockExistingStocks = stockRec.currentStock;
                const updatedCount = parseFloat(stockRec.currentStock) - parseFloat(materials[matName]);
                if (updatedCount < 1) {
                    extraUsedMaterialsMap[matName] = updatedCount;
                }
                stockRec.currentStock = updatedCount;
                stockRec.save();
                await StockLogService.stockLogForBillingEvent({
                    date: moment().format('MM-DD-YYYY'),
                    existingStock: stockExistingStocks,
                    updatedStock: updatedCount,
                    stockChangeQuantity: parseFloat(materials[matName]),
                    notes: `Material used for billing the ${orderType} ${orderName ? ':' + orderName : '' }`,
                    price: stockRec.price,
                    StockId: stockRec.id,
                    EmployeeId: employeeId,
                }, shop);
            }
        }
        
        //return extraUsedMaterialsMap;
        return bill;
    }*/

}



module.exports = BillService;
