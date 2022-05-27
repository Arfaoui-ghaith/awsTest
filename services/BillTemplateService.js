const ShopService = require("./ShopService");
const { BillTemplate } = require("../models");
const { v4: uuidv4 } = require('uuid');

class BillTemplateService {
    static async createBillTemplate(billTemplateParams) {
        const {shopId, logo, header, footer } = billTemplateParams;
        const shop = await ShopService.getShopById(shopId);
        /*if(!logo){
            throw Error("Invalid Logo for create bill template.")
        }*/
        const billTemplate = await BillTemplate.create({
            id: uuidv4(),
            //logo,
            header,
            footer
        });
        await shop.addBillTemplate(billTemplate);
        return billTemplate;
    }

    static async getAllBillTemplates(shopId) {
        const billTemplates = await BillTemplate.findAll({where: {ShopId: shopId}});
        return billTemplates;
    }

    static async updateBillTemplates(billTemplateParams,billTemplateId) {
        const {logo, header, footer} = billTemplateParams;
        const billTemplate = await BillTemplate.findByPk(billTemplateId);
        /*if(billTemplate.logo){
            billTemplate.logo = logo;
        }*/
        billTemplate.header = header || billTemplate.header;
        billTemplate.footer = footer || billTemplate.footer;
        await billTemplate.save();
        return billTemplate;
    }
}

module.exports = BillTemplateService;
