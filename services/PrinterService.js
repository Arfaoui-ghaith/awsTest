const ShopService = require("./ShopService");
const { Printer } = require("../models");
const { v4: uuidv4 } = require('uuid');

class PrinterService {
    static async createPrinter(printerParams) {
        const {shopId, name, description, ipAddress } = printerParams;
        const shop = await ShopService.getShopById(shopId)

        if(!name){
            throw Error('Name is needed for printer!')
        }

        const printers = await Printer.findAll({ where: { name, ShopId: shop.id } })
        if(printers.length > 0){
            throw Error('Printer name already used!')
        }

        const printer = await Printer.create({
            id: uuidv4(),
            name,
            description,
            ipAddress
        });
        await shop.addPrinter(printer);
        return printer;
    }

    static async getAllPrinters(shopId) {
        console.log('im here now')
        const printers = await Printer.findAll({where: {ShopId: shopId, isActive: true}});
        return printers;
    }

    static async updatePrinter(printerParams,printerId) {
        const {name, description, ipAddress} = printerParams;
        const printer = await Printer.findByPk(printerId);

        if(name && name != printer.name){
            const printers = await Printer.findAll({ where: { name, ShopId: printer.ShopId, isActive: true } })
            if(printers.length > 0){
                throw Error('Printer name already used!')
            }
            printer.name = name
        }
        

        
        printer.description = description || printer.description;
        printer.ipAddress = ipAddress || printer.ipAddress;
        await printer.save();
        return printer;
    }

    static async deletePrinter(id) {
        const printer = await Printer.findByPk(id);
        if (!printer) {
            throw Error('No printer found for the given Id.')
        }
        if (printer.isDeletable) {

            return await Printer.destroy({ where: { id },returning: true });

        } else {
            throw Error('[ALREADY IN USE] Cannot delete the printer which are in action!');
        }
    }
}

module.exports = PrinterService;
