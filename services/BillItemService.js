const StockLogService = require("./StockLogService");
const { Shop, Session, Printer, Company, Bill_Item } = require("../models");
const { v4: uuidv4 } = require('uuid');
const { Op, QueryTypes } = require('sequelize');

class BillItemService {

    static async createBillItem(billItemParams) {

        let billItems = [];

        for(const billItem of billItemParams){
            const shop = await Shop.findByPk(billItem.shopId);

            if(!shop) {
                throw Error('Invalid Shop id provided')
            }

            const session = await Session.findByPk(billItem.sessionId)

            if(!session) {
                throw Error('Invalid Session id provided')
            }

            const printer = await Printer.findByPk(billItem.printerId)

            if(!printer) {
                throw Error('Invalid Printer id provided')
            }

            if(billItem.companyId){
                const company = await Company.findByPk(billItem.companyId)

                if(!company) {
                    throw Error('Invalid Company id provided')
                }
            }

            const bill_item = await Bill_Item.create({...billItem, id: uuidv4(), status: billItem.status.toLowerCase()});

            billItems.push(bill_item);
        }

        return billItems;
        
    }

    static async updateBillItem(billItemParams,id) {

        const bill_item = await Bill_Item.findByPk(id);

        if(!bill_item){
            throw Error('Invalid Bill-Item id provided')
        }

        if(billItemParams.shopId){
            const shop = await Shop.findByPk(billItemParams.shopId);
            if(!shop) {
                throw Error('Invalid Shop id provided')
            }
            bill_item.shopId = billItemParams.shopId || bill_item.shopId;
        }

        if(billItemParams.sessionId){
            const session = await Session.findByPk(billItemParams.sessionId)
            if(!session) {
                throw Error('Invalid Session id provided')
            }
            bill_item.sessionId = billItemParams.sessionId || bill_item.sessionId;
        }

        if(billItemParams.printerId){
            const printer = await Printer.findByPk(billItemParams.printerId)
            if(!printer) {
                throw Error('Invalid Printer id provided')
            }
            bill_item.printerId = billItemParams.printerId || bill_item.printerId;
        }

        if(billItemParams.companyId){
            const company = await Company.findByPk(billItemParams.companyId)

            if(!company) {
                throw Error('Invalid Company id provided')
            }
            bill_item.companyId = billItemParams.companyId || bill_item.companyId;
        }


        bill_item.bill_name = billItemParams.bill_name || bill_item.bill_name;
        bill_item.item_name = billItemParams.item_name || bill_item.item_name;
        bill_item.quantity = billItemParams.quantity || bill_item.quantity;
        bill_item.price = billItemParams.price || bill_item.price;
        bill_item.kitchen_info = billItemParams.kitchen_info || bill_item.kitchen_info;
        bill_item.status = billItemParams.status || bill_item.status;
        bill_item.send_time = billItemParams.send_time || bill_item.send_time;
        bill_item.bill_no = billItemParams.bill_no || bill_item.bill_no;

        await bill_item.save()
        

        return bill_item;
        
    }

    static async getByStatus(shopId,printerId){

        const billItems = await Bill_Item.findAll({ where: { shopId } });

        let billsTAB = [];

        for(const status of ['active','completed']){
            let values = []
            for(const bill of billItems){
                if(status == bill.status && bill.printerId == printerId){
                    
                    values.push(bill)
                }
            }
            let obj = {}
            obj[status] = values
            billsTAB.push(obj)
        }

        return billsTAB;
    }

    static async getByPrinter(shopId){

        const billItems = await Bill_Item.findAll({ where: { shopId } });
        const printers = await Printer.findAll({ where: { ShopId: shopId } });

        let billsTAB = [];

        for(const printer of printers){
            let values = []
            for(const bill of billItems){
                
                if(printer.id == bill.printerId){
                
                    values.push(bill)
                }
            }
            let obj = {}
            obj[printer.name] = values
            billsTAB.push(obj)
        }

        return billsTAB;
    }

    static async deleteBillItem(id) {
        const bill_item = await Bill_Item.findByPk(id);
        if (!bill_item) {
            throw Error('No Bill-Item found for the given Id.')
        }
       
        return await Bill_Item.destroy({where: {id}});
    }

    static async deleteAllBillItem(shopId,sessionId) {
        if(shopId)
        await Bill_Item.destroy({ where: { shopId } });
        if(sessionId)
        await Bill_Item.destroy({ where: { sessionId } });
    }



}

module.exports = BillItemService;