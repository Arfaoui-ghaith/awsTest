const ShopService = require("./ShopService");
const { MenuItemCategory, MenuItem, Shop } = require("../models");
const { v4: uuidv4 } = require('uuid');

class MenuItemCategoryService {
    static async createMenuItemCategory(menuItemCategoryParams) {
        const {shopId, name, description, isActive, isFavorite } = menuItemCategoryParams;

        const menuCategories = await MenuItemCategory.findAll({ where:{ name, ShopId: shopId } });

        if(menuCategories.length > 0){
            throw Error('Category name already used!')
        }

        const shop = await ShopService.getShopById(shopId)
        const menuItemCategory = await MenuItemCategory.create({
            id: uuidv4(),
            name,
            description,
            isActive,
            isFavorite
        });
        await shop.addMenuItemCategory(menuItemCategory);
        return menuItemCategory;
    }

    // to do filter by shop name public API
    static async getAllMenuItemCategories(shopId,shopName) {
        if(shopId && !shopName){
            const menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shopId, isActive: true}});
            return menuItemCategories;
        }
        if(shopName && !shopId){
            const shop = await Shop.findOne({ where: { name: shopName } });
            const menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shop.id, isActive: true}});
            return menuItemCategories;
        }
        if(shopName && shopId){
            const shop = await Shop.findOne({ where: { name: shopName, id: shopId } });
            if(!shop){
                throw Error('The shop name dont belongs to the shop id given.')
            }
            const menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shop.id, ShopId: shopId, isActive: true}});
            return menuItemCategories;
        }
    }

    static async getAllMenuItemCategoriesPrivet(shopId,shopName) {
       
        let menuItemCategories;
        if(shopId && !shopName){
            menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shopId, isActive: true}, include:{ model:MenuItem, as:'menuItems' }});
            
        }
        if(shopName && !shopId){
            const shop = await Shop.findOne({ where: { name: shopName } });
            menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shop.id, isActive: true}, include:{ model:MenuItem, as:'menuItems' }});
            
        }
        if(shopName && shopId){
            const shop = await Shop.findOne({ where: { name: shopName, id: shopId } });
            if(!shop){
                throw Error('The shop name dont belongs to the shop id given.')
            }
            menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shop.id, ShopId: shopId, isActive: true}, include:{ model:MenuItem, as:'menuItems' }});
            
        }

        let mcMenuItems=[];

        for(const menuItemCategory of menuItemCategories){
            let variants=[];
            for(const menuItem of menuItemCategory.menuItems){
                if(menuItem.variants != null && menuItem.variants.length > 0){
                    variants = variants.concat(menuItem.dataValues.variants);
                }
            }
           
            let tab=[];
            for(const menuItem of menuItemCategory.menuItems){
                let condition = true;
                for(const v of variants){
                    if(v.id == menuItem.id){
                        condition = false
                    }
                }
                if(condition){
                    tab.push(menuItem.dataValues)
                }
            }

            mcMenuItems.push({ ...menuItemCategory.dataValues, menuItems: tab})
            console.log(mcMenuItems);
        }

        

        return mcMenuItems
       
    }

    static async getAllMenuItemCategoriesMenuItemsVariants(shopId,shopName) {
        if(shopId && !shopName){
            const menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shopId, isActive: true}, attributes: { exclude: ['id','ShopId'] }, include:{model: MenuItem, as:'menuItems', attributes: { exclude: ['id','MenuItemCategoryId','ShopId','variants'] }}});
            return menuItemCategories;
        }
        if(shopName && !shopId){
            const shop = await Shop.findOne({ where: { name: shopName } });
            const menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shop.id, isActive: true}, attributes: { exclude: ['id','ShopId'] }, include:{model: MenuItem,as:'menuItems', attributes: { exclude: ['id','MenuItemCategoryId','ShopId','variants'] }}});
            return menuItemCategories;
        }
        if(shopName && shopId){
            const shop = await Shop.findOne({ where: { name: shopName, id: shopId } });
            if(!shop){
                throw Error('The shop name dont belongs to the shop id given.')
            }
            const menuItemCategories = await MenuItemCategory.findAll({where: {ShopId: shop.id, ShopId: shopId, isActive: true}, attributes: { exclude: ['id','ShopId'] }, include:{model: MenuItem,as:'menuItems', attributes: { exclude: ['id','MenuItemCategoryId','ShopId','variants'] }}});
            return menuItemCategories;
        }
    }

    static async updateMenuItemCategory(menuItemCategoryParams) {
        const {id, name, description, isActive, isFavorite } = menuItemCategoryParams;
        const menuItemCategory = await MenuItemCategory.findByPk(id);
        if(!menuItemCategory) {
            throw Error('Invalid menu Item category provided.')
        }

        if(name && menuItemCategory.name != name){
            const menuCategories = await MenuItemCategory.findAll({ where:{ name, ShopId: menuItemCategory.ShopId, isActive: true } });
            if(menuCategories.length > 0 ){
                throw Error('Category name already used!')
            }
            menuItemCategory.name = name
        }

       
        menuItemCategory.description = description || menuItemCategory.description;
        menuItemCategory.isActive = (isActive!==null && isActive!==undefined) ? isActive : menuItemCategory.isActive;
        menuItemCategory.isFavorite = (isFavorite!==null && isFavorite!==undefined) ? isFavorite : menuItemCategory.isFavorite;
        await menuItemCategory.save();
        return menuItemCategory;
    }

    static async deleteMenuItemCategory(menuItemCategoryId) {
        const menuItemCategory = await MenuItemCategory.findOne({ where: { id: menuItemCategoryId}, include:{ model:MenuItem, as:'menuItems' }});
        if (!menuItemCategory) {
            throw Error('MenuItemCategory does not exist.')
        }
        if(menuItemCategory.MenuItem){
            throw Error('Menu item category has menu items cant be delete.')
        }
        if (menuItemCategory.isDeletable) {
            return await MenuItemCategory.update({isActive: false},{where: {id: menuItemCategoryId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the menuItemCategories which are in use!');
        }
    }
}

module.exports = MenuItemCategoryService;
