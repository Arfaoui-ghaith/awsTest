const { Shop, Employee, Role, Material, Stock, Unit } = require("../models");
const { v4: uuidv4 } = require('uuid');

class MaterialService {
    static async getMaterialByNameOrId(materialName,materialId=null) {
        let material;
        if (materialId) {
            const material = await Material.findOne({ where: {id: materialId}, include:[Unit] });
            if(!material) {
                throw Error('No material found for the given material id.')
            }
            return material;
        }
        if (materialName) {
            const material = await Material.findOne({ where: {name: materialName}, include:[Unit] });
            if(!material) {
                throw Error('No material found for the given material name.')
            }
            return material;
        }
        throw Error('Invalid material id or material name.')
    }
    static async createMaterial(materialParams) {
            const {shopId, UnitId, name, units, price, description, employeeId, priceDiffForEmailAlert} = materialParams;
            if(!shopId) {
                throw Error('shopId is required to create new Material.')
            }
            if (!employeeId) {
                throw Error('EmployeeId required to create new Material');
            }
            if (!UnitId) {
                throw Error('unitId required to create new Material');
            }
            const shop = await Shop.findByPk(shopId);
            if(!shopId) {
                throw Error('Invalid ShopId passed')
            }
            const employee = await Employee.findByPk(employeeId);
            if (!employee) {
                throw Error('Invalid Employee id passed');
            }
            const unit = await Unit.findByPk(UnitId);
            if (!unit) {
                throw Error('Invalid Unit id passed');
            }

            if(!priceDiffForEmailAlert || !parseFloat(priceDiffForEmailAlert)){
                throw Error('Price is mandatory and must be valid number.')
            }

            // todo: add validation in the backend for name.
            const materialExists = await Material.findOne({where: {ShopId: shopId, name: name.toLowerCase()}})
            if(materialExists) {
                throw Error('Material with the same name already exists');
            }
            const material = await Material.create({
                id: uuidv4(),
                name: name.toLowerCase(),
                units,
                price,
                description,
                priceDiffForEmailAlert,
                UnitId: unit.id,
                ShopId: shop.id,
                CompanyId: shop.CompanyId
            });
            
            //employee.isDeletable = false;
            await employee.save();
            unit.isDeletable = false;
            await unit.save();
            return material;
    }

    static async getAllMaterials(shopId) {
        const materials = await Material.findAll({where: {ShopId: shopId, isActive: true}, include:[Unit]});
        return materials;
    }

    static async updateMaterial(materialParams,id) {
        const {name, units, price, description, shopId, priceDiffForEmailAlert, UnitId} = materialParams;
        const material = await Material.findByPk(id);
        if (!material) {
            throw Error('No material found for the given material id')
        }
        // todo: add validation in the backend for name.
        if(shopId){
            const materialExists = await Material.findOne({where: {ShopId: shopId, name: name.toLowerCase()}})
            if(materialExists) {
                throw Error('Material with the same name already exists');
            }
        }

        
        
        material.name = name || material.name;
        material.units = units || material.units;
        material.price = price || material.price;
        material.description = description || material.description;
        material.priceDiffForEmailAlert = priceDiffForEmailAlert || material.priceDiffForEmailAlert;
        // if(deleted) {
        //     //3. If a material is used in stock, menu item then do not display "delete" button. This material can not be deleted.
        //     const stocks = await Stock.findAll({where: {ShopId: shopId, materialName: name.toLowerCase()}});
        //     if(stocks.length) {
        //         throw Error('Material is being used in stock');
        //     }
        //     await material.destroy();
        //     return `${material.name} Material deleted`;
        // }
        if(UnitId){
            const unit = await Unit.findByPk(UnitId);
            if (!unit) {
                throw Error('Invalid Unit id passed');
            }
            material.UnitId = unit.id;
            unit.isDeletable = false;
            await unit.save();
        }
        
        await material.save();

        return material;
    }

    static async deleteMaterial(materialId) {
        const material = await Material.findByPk(materialId);
        if(!material) {
            throw Error('Material does not exist.')
        }
        if (material.isDeletable) {
            return await Material.update({isActive: false},{where: {id: materialId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the materials which are in use!');
        }
        return true;
    }

}

module.exports = MaterialService;
