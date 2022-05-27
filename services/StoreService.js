const { Shop, Store, Stock, Company, PosSetup } = require("../models");
const ShopService = require('../services/ShopService');
const { v4: uuidv4 } = require('uuid');
const shop = require("../models/shop");

class StoreService {
    static async getStoreById(storeId) {
        if (!storeId) {
            throw Error('No Store Id given');
        }
        const store = await Store.findByPk(storeId);
        if(!store) {
            throw Error('No store found for the given store id.')
        }
        return store;
    }

    static async createStore(storeParams,user) {
        
        const {companyId, name, description, isActive, employeeId} = storeParams;

        if(!name){
            throw Error('Name is needed for store!')
        }

        const stores = await Store.findAll({ where: { name, CompanyId: companyId } })
        if(stores.length > 0){
            throw Error('Store name already used!')
        }
        
        /*if(!shopId) {
            throw Error('shopId is required to create new store.')
        }
        
        const shop = await Shop.findOne({where:{id: shopId}});
        
        if(!shop) {
            throw Error('Invalid ShopId passed')
        }

        const pos = await PosSetup.findOne({ where: { ShopId: shop.id } });*/
        let employee;
        if(!employeeId){
             employee = await ShopService.getEmployeeById(user.id);
        }else{
             employee = await ShopService.getEmployeeById(employeeId);
        }
        if(!employee){
            delete storeParams.employeeId
        }

        if(!companyId){
            throw Error('company id required to perform this action.')
        }
        const company = await Company.findByPk(companyId);

        if(!company){
            throw Error('No store found for the given store id.')
        }
        
        //console.log('step 3')
        storeParams.CompanyId = companyId;
        delete storeParams.companyId;
        const store = await Store.create({
            id: uuidv4(),
            ...storeParams
        });
        /*store.ShopId = shop.id;
        store.PosSetupId = pos ? pos.id : null
        store.save();*/
        //employee.isDeletable = false;
        await employee.save();
        console.log('step 5',employee)
        return store;
    }

    static async getAllStores(shopId) { 
        if(!shopId){
            throw Error("Invalid shop Id or company Id")
        }
        const shop = await Shop.findByPk(shopId);
        if(shop){
            const stores = await Store.findAll({where: {ShopId: shop.id}, include: [Stock]});
            return stores;
        }
        const company = await Company.findByPk(shopId);
        if(company){
            const stores = await Store.findAll({where: {CompanyId: company.id}, include: [Stock]});
            return stores;
        }
        throw Error("This Id dont belongs to either company or shop.")
    }

    static async updateStore(storeParams,id) {
        const { name, description, isActive, deleted, shopId} = storeParams;
        let store = await Store.findByPk(id);

        if(!store){
            throw Error('No store found with the given id.')
        }

        if(name && name != store.name){
            const stores = await Store.findAll({ where: { name, CompanyId: store.CompanyId, isActive: true } })
            if(stores.length > 0){
                throw Error('Store name already used!')
            }
        }

        store = await Store.update(storeParams,{ where: { id }, returning: true })
        return store[1][0];
    }

    static async deleteStore(storeId) {
        const store = await Store.findByPk(storeId);
        if(!store) {
            throw Error('Store item does not exist.')
        }
        if (store.isDeletable) {
            return await Store.destroy({where: {id: storeId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the stores which are in use!');
        }
        return true;
    }
}

module.exports = StoreService;
