const ShopService = require('./ShopService')
const { PosSetup, Store, Shop } = require("../models");
const { v4: uuidv4 } = require('uuid');

class PosSetupService {

    static async createPosSetup(posSetupParams){
        const posSetup = await PosSetup.create({
            id: uuidv4(),
            ...posSetupParams
        });
        return posSetup;
    }

    static async updatePosSetup(posSetupParams,shopId) {
        const {currency, logo, timeFormat, enableScanner, storeId, image, isActive, isDeletable, billSeries, ipAddress } = posSetupParams;
        const pos = await PosSetup.findOne({ where :{ShopId: shopId} });
        if(!pos){
            throw Error('No POS Setup found for the given shop Id.');
        }
        if(storeId){
            const store = await Store.findByPk(storeId)
            if(!store){
                throw Error('No Store found for the given Id.');
            }
            pos.StoreId = store.id;
        }

        pos.image = image || pos.image;
        pos.currency = currency || pos.currency;
        pos.logo = logo || pos.logo;
        pos.timeFormat = timeFormat || pos.timeFormat;
        pos.enableScanner = enableScanner || pos.enableScanner;
        pos.isActive = isActive || pos.isActive;
        pos.isDeletable = isDeletable || pos.isDeletable;
        pos.billSeries = billSeries || pos.billSeries;
        pos.ipAddress = ipAddress || pos.ipAddress;

        pos.save();

        console.log(pos);

        return pos;
    }

    /*static async updatePosSetup(posSetupParams,shopId) {
        const {currency, logo, timeFormat, enableScanner, storeId, isActive, isDeletable } = posSetupParams;
        if (!shopId) {
            throw Error('No shopId provided!');
        }
        const shop = await Shop.findByPk(shopId);
        if(!shop) {
            throw Error('No shop with the given id found.');
        }
        const posSetup = await PosSetup.findOne({where: {ShopId: shopId}})
        let store;
        if (storeId) {
            store = await Store.findByPk(storeId);
            if (!store) {
                throw Error('No store found for the given store id!');
            }
        }

        if(posSetup) {

            if (store) {
                if (posSetup.StoreId && posSetup.StoreId !== storeId) {
                    throw Error('Store can only be attached to the shop only once!')
                } else if (!posSetup.StoreId){
                    store.PosSetupId = posSetup.id;
                    store.isDeletable = false;
                    await store.save();
                    posSetup.StoreId = storeId;
                }
            }

            // is this shop name?
            //posSetup.name = name || posSetup.name;
            posSetup.currency = currency || posSetup.currency;
            posSetup.logo = logo || posSetup.logo;
            posSetup.timeFormat = timeFormat || posSetup.timeFormat; // TODO make it a enum type field
            posSetup.enableScanner = enableScanner || posSetup.enableScanner;
            // If POS SETUP has store assigned, we can't change that that's why below we are using the store from record first
            await posSetup.save();
            return posSetup;
        } else {
            const posSetup = await PosSetup.create({
                id: uuidv4(),
                currency,
                logo,
                timeFormat,
                enableScanner,
                StoreId: store ? storeId : null,
            });
            if (store) {
                store.PosSetupId = posSetup.id;
                store.isDeletable = false;
                await store.save();
            }
            await shop.addPosSetup(posSetup);
            return posSetup;
        }
    }*/

    static async getPosSetup(shopId) {
        const posSetup = await PosSetup.findAll({where: {ShopId: shopId, isActive: true}, include:[Shop]});
        return posSetup;
    }

    static async deletePosSetup(ShopId) {
        const pos = await PosSetup.findOne({where: { ShopId }});
        if (!pos) {
            throw Error('No posSetup found for the given Id, Shop already Deleted')
        }
        if (pos.isDeletable) {
            let posJSON = await PosSetup.destroy({where: {id: pos.id}});
            return posJSON;
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the employee which are in action!');
        }
    }
}

module.exports = PosSetupService;
