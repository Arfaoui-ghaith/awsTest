const ShopService = require("./ShopService");
const { Unit } = require("../models");
const { v4: uuidv4 } = require('uuid');

class UnitService {
    static async createUnit(unitParams) {
        const {shopId, name, description, shortForm } = unitParams;
        if(shopId){
            const shop = await ShopService.getShopById(shopId);
        }

        if(name){
            if(name.trim() == ""){
                throw Error('Name is needed for Unit!')
            }
        }
    
        const unitWithSameNameExists = await Unit.findOne({ where: {name}});
        if (unitWithSameNameExists) {
            throw Error('Unit with same name already exists!')
        }
        const unit = await Unit.create({
            id: uuidv4(),
            name,
            shortForm,
            description,
        });
        if(shopId){
            await shop.addUnit(unit);
        }
        
        return unit;
    }

    static async getAllUnits(shopId) {
        if(shopId){
            const units = await Unit.findAll({where: {ShopId: shopId}});
            return units;
        }else{
            const units = await Unit.findAll();
            return units;
        }
    }

    static async updateUnit(unitParams) {
        const {id, name, description, shortForm, isDeletable} = unitParams;

        if(name){
            if(name.trim() == ""){
                throw Error('Name is needed for Unit!')
            }
        }
        
        if (!id) {
            throw Error('Unit ID is required to update the unit');
        }
        console.log(id)
        const unit = await Unit.findByPk(id);
        
        if (!unit) {
            throw Error('No unit found for the given ID')
        }
        else if (name && unit.name !== name) {
            const unitWithSameNameExists = await Unit.findOne({ where: {name}});
            if (unitWithSameNameExists) {
                throw Error('Unit with same name already exists!')
            }
        }
        unit.isDeletable = isDeletable || unit.isDeletable;
        unit.name = name || unit.name;
        unit.description = description || unit.description;
        unit.shortForm = shortForm || unit.shortForm;
        await unit.save();
        return unit;
    }

    static async deleteUnit(unitId) {
        const unit = await Unit.findByPk(unitId);
        if (!unit) {
            throw Error('No Unit found for the given Id.')
        }
        if (unit.isDeletable) {
            return await Unit.destroy({where: {id: unitId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the unit !');
        }
    }
}

module.exports = UnitService;
