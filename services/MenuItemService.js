const { Op, fn, col } = require("sequelize");
const ShopService = require("./ShopService");
const { Shop, MenuItemCategory, MenuItem, Bill,Printer, Employee, Material, SellingItemsLog } = require("../models");
const { v4: uuidv4 } = require('uuid');

class MaterialService {
    static async createMenuItem(menuItemParams) {
            const {shopId, name, arabicName, arabicDescription, description, materials, sellingPrice, isFavorite, printerId, image,barCode, menuItemCategoryId, employeeId} = menuItemParams;
            const shop = await ShopService.getShopById(shopId);

            
            const menuItems = await MenuItem.findAll({ where: { name, ShopId: shop.id, isActive: true }})

            if(menuItems.length > 0 ){
                throw Error('Menu item name already used!')
            }

            const menuItemCategory = await MenuItemCategory.findByPk(menuItemCategoryId);
            if(!menuItemCategory) {
                throw Error('Category is required to create menu item.')
            }
            if (!employeeId) {
                throw Error('Employee id not passed');
            }
            const employee = await Employee.findByPk(employeeId);
            if (!employee) {
                throw Error('Invalid Employee id passed');
            }
            const printer = await Printer.findByPk(printerId);
            if (!printer) {
                throw Error('Printer need to be selected.');
            }
            // todo: add validation in the backend for name.
            const menuItemExists = await MenuItem.findOne({where: {ShopId: shopId, name: name.toLowerCase()}})
            if(menuItemExists) {
                throw Error('Menu item with the same name already exists');
            }
            const menuItem = await MenuItem.create({
                id: uuidv4(),
                name: name.toLowerCase(),
                description,
                arabicName,
                arabicDescription,
                materials,
                variants: [],
                sellingPrice,
                isFavorite,
                image,
                PrinterId: printer.id,
                PrinterName: printer.name,
                barCode,
                MenuItemCategoryId: menuItemCategoryId,
                employeeId,
            });
            await shop.addMenuItem(menuItem);
            //employee.isDeletable = false;
            menuItemCategory.isDeletable = false;
            await employee.save();
            await menuItemCategory.save();
            // For all the materials loop through them and make them non deletable
            if(materials){
                for (const {materialId} of materials) {
                    const materialRec = await Material.findByPk(materialId);
                    materialRec.isDeletable = false;
                    await materialRec.save();
                }
            }
            
            return menuItem;
    }

    //to do filter by shop name public api get all variants
    static async getAllVariantsOfMenuItemsByShopName(shopName) {
        const shop = await Shop.findOne({ where:{ name: shopName } });
        if(!shop){
            throw Error('No shops with the shop name given.')
        }
        const menuItems = await MenuItem.findAll({ attributes: ['name','variants'] ,where: {ShopId: shop.id, isActive: true}});
        return {shopName: shop.name, variants: menuItems};
    }

    // to do filter by shop name public API
    static async getAllMenuItems(shopId,shopName) {
        
        let menuItems;
        if(shopId){
            menuItems = await MenuItem.findAll({where: {ShopId: shopId, isActive: true /*isFavorite: { [Op.not]: null}*/}, include: [MenuItemCategory]});
            
            let variants=[];
            for(const menuItem of menuItems){
                if(menuItem.variants != null && menuItem.variants.length > 0){
                    let vArray = menuItem.dataValues.variants.map(el => { return {...el, parentName: menuItem.name, parentId: menuItem.id} })
                    variants = variants.concat(vArray);
                }
            }

            let tab = menuItems.map(el => {
                
                if( variants.some(v => v.id == el.id)){
                    let obj = variants.find(v => v.id == el.id);
                    return { ...el.dataValues, isVariant: true, parentName: obj.parentName, parentId: obj.parentId }
                }
                return { ...el.dataValues, isVariant: false }
            })

            return tab;
        }else{
            const shop = await Shop.findOne({ where: { name:  shopName} });
            if(!shop){
                throw Error('No shops found with the shop name given.')
            }
            menuItems = await MenuItem.findAll({where: {ShopId: shop.id, isActive: true /*isFavorite: { [Op.not]: null}*/}, include: [MenuItemCategory]});
            
            let variants=[];
            for(const menuItem of menuItems){
                if(menuItem.variants != null && menuItem.variants.length > 0){
                    let vArray = menuItem.dataValues.variants.map(el => { return {...el, parentName: menuItem.name, parentId: menuItem.id} })
                    variants = variants.concat(vArray);
                }
            }

            let tab = menuItems.map(el => {
                
                if( variants.some(v => v.id == el.id)){
                    let obj = variants.find(v => v.id == el.id);
                    return { ...el.dataValues, isVariant: true, parentName: obj.parentName, parentId: obj.parentId }
                }
                return { ...el.dataValues, isVariant: false }
            })


            return tab;
        }
        
        /*let variants=[];
        for(const menuItem of menuItems){
            if(menuItem.variants != null && menuItem.variants.length > 0){
                variants = variants.concat(menuItem.dataValues.variants);
            }
        }

        let tab=[];
        for(const menuItem of menuItems){
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

        return tab;*/
    }

    static async getMenuItemsByCategoryId(shopId, menuItemCategoryId) {
        const menuItems = await MenuItem.findAll({where: {ShopId: shopId, isActive: true, MenuItemCategoryId: menuItemCategoryId}, include: [MenuItemCategory]});

        let variants=[];
        for(const menuItem of menuItems){
            if(menuItem.variants != null && menuItem.variants.length > 0){
                variants = variants.concat(menuItem.dataValues.variants);
            }
        }

        let tab=[];
        for(const menuItem of menuItems){
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

        return tab;
    }

    static async getAllFavouriteMenuItems(shopId) {
        const favMenuItems = await MenuItem.findAll({where: {ShopId: shopId, isActive: true, isFavorite: true}, include: [MenuItemCategory]});
        return favMenuItems;
    }

    static async updateMenuItem(menuItemParams,id) {
        const {shopId, name, arabicName,arabicDescription,description, materials, sellingPrice, isFavorite ,printerId, image ,barCode, menuItemCategoryId} = menuItemParams;
        const menuItem = await MenuItem.findByPk(id);
        if(!menuItem) {
            throw Error('Menu item not found.')
        }

        if(shopId){
            const shop = await Shop.findByPk(shopId);
            if(!shop) {
                throw Error('No shop found with the given id.')
            }
            menuItem.ShopId = shopId;
        }

        if(name && menuItem.name != name){
            const menuItems = await MenuItem.findAll({ where: {name, ShopId: menuItem.ShopId, isActive: true }})

            if(menuItems.length > 0){
                throw Error('Menu item name already used!')
            }

            menuItem.name = name;
        }

        if(arabicName && menuItem.arabicName != arabicName){
            const menuItems = await MenuItem.findAll({ where: { arabicName, ShopId: menuItem.ShopId, isActive: true } })

            if(menuItems.length > 0){
                throw Error('Menu item arabic name already used!')
            }

            menuItem.arabicName = arabicName;
        }

        if(menuItemCategoryId) {
            const menuItemCategory = await MenuItemCategory.findByPk(menuItemCategoryId);
            if(!menuItemCategory) {
                throw Error('No menu Item category found with the given id.')
            }
            menuItem.menuItemCategoryId = menuItemCategoryId || menuItem.menuItemCategoryId;
        }

        if(printerId){
            const printer = await Printer.findByPk(printerId);
            if (!printer) {
                throw Error('Printer need to be selected.');
            }
            menuItem.printerId = printer.id || menuItem.printerId;
            menuItem.printerName = printer.name || menuItem.printerName;
        }
        

        menuItem.arabicDescription = arabicDescription || menuItem.arabicDescription;
        menuItem.description = description || menuItem.description;
        menuItem.image = image || menuItem.image;
        menuItem.materials = materials || menuItem.materials;
        menuItem.sellingPrice = sellingPrice || menuItem.sellingPrice;
        menuItem.isFavorite = isFavorite || menuItem.isFavorite;
        menuItem.barCode = barCode || menuItem.barCode;
        
        await menuItem.save();
        return menuItem;
    }

    static async deleteMenuItem(menuItemId) {
        const menuItem = await MenuItem.findByPk(menuItemId);
        if(!menuItem) {
            throw Error('Menu item does not exist.')
        }

        if(menuItem.variants){
            for(const variant of menuItem.variants ){
                await MenuItem.destroy({where: {id: variant.id}});
            }
        }

        if (menuItem.isDeletable) {
            return await MenuItem.destroy({where: {id: menuItemId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the menuItems which are in use!');
        }
    }

    static async deleteVariant(menuItemId, id) {
        const menuItem = await MenuItem.findByPk(menuItemId);
        const menuItemChild = await MenuItem.findByPk(id);
        if(!menuItem) {
            throw Error('Menu item not found.')
        }
        await MaterialService.deleteMenuItem(id);
        let V = []
        if(menuItem.variants){
            for(const variant of menuItem.variants ){
                if(variant.id !== menuItemChild.id) {V.push(variant)}
            }
        }
        menuItem.variants = V;
        await menuItem.save();
        return menuItem;
    }

    static async createMenuItemVariant(menuItemParams) {
        const {shopId, menuItemId, name, arabicName, arabicDescription, image, materials, sellingPrice, employeeId, barCode, printerId, printerName} = menuItemParams;
        const shop = await ShopService.getShopById(shopId);
        const menuItem = await MenuItem.findByPk(menuItemId);
        if(!menuItem) {
            throw Error('Category is required to create menu item.')
        }
        
        const menuItems = await MenuItem.findAll({ where: {name, ShopId: shop.id } })

        if(menuItems.length > 0 ){
            throw Error('Menu item name already used!')
        }
        
        if (!employeeId) {
            throw Error('Employee id not passed');
        }
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            throw Error('Invalid Employee id passed');
        }
        let printer;
        if(printerId){
            const printer = await Printer.findByPk(printerId);
            if (!printer) {
                throw Error('Invalid printer id passed');
            }
        }else{
            printer = {PrinterId: menuItem.PrinterId, PrinterName: menuItem.PrinterName}
        }
        // todo: add validation in the backend for name.
        const variantxists = await MenuItem.findOne({where: {ShopId: shopId, name: name.toLowerCase()}})
            if(variantxists) {
                throw Error('Variant with the same name already exists');
            }
        let id = uuidv4()

        //*********************************************************/
        const menuItemVariant = await MenuItem.create({
            ...menuItemParams,
            id,
            MenuItemCategoryId: menuItem.MenuItemCategoryId,
            employeeId: employee.id,
            ShopId: shop.id,
            PrinterId: printer.PrinterId,
            PrinterName: printer.PrinterName,
            arabicName, 
            arabicDescription
        });
        //*********************************************************/
        
        menuItem.variants = [...menuItem.variants, menuItemVariant.dataValues];
        //employee.isDeletable = false;
        await employee.save();
        // For all the materials loop through them and make them non deletable
        if(materials){
            for (const {materialId} of materials) {
                const materialRec = await Material.findByPk(materialId);
                materialRec.isDeletable = false;
                await materialRec.save();
            }
        }
        await menuItem.save();
        return menuItemVariant;
    }

    static async updateMenuItemVariant(menuItemParams,id) {
        const { menuItemId } = menuItemParams;

        if(!menuItemId) throw Error('menu Item id required for update variant.')
        const menuItemParent = await MenuItem.findByPk(menuItemId)
        if(!menuItemParent) throw Error('No menu Item found with the id given.')

        const menuItemChild = await MaterialService.updateMenuItem(menuItemParams,id);

        let V = []
        if(menuItemParent.variants){
            for(const variant of menuItemParent.variants ){
                console.log(variant);
                if(variant.id !== menuItemChild.id) {V.push(variant)}
                else { V.push(menuItemChild) }
            }
        }
        menuItemParent.variants = V;
        await menuItemParent.save();
        return menuItemChild;
    }

    static async getTopSellingItem(shopId, startDate, endDate) {
        if(!shopId) throw Error('Shop id required.')
        const shop = await Shop.findByPk(shopId);
        if(!shop) throw Error('Invalid shop id required.')
        startDate += 'T00:00:00.000Z'
        endDate += 'T23:59:59.000Z'

        const menuItemsWithSoldQuantities = await SellingItemsLog.findAll({
            where: {
                ShopId: shopId,
                createdAt: {[Op.between]: [startDate, endDate]}
            },
            include: [
                {model: MenuItem, include: [MenuItemCategory] }
            ],
            attributes: ['MenuItemId', [fn('sum', col('quantity')), 'quantity']],
            group: ['SellingItemsLog.MenuItemId', 'MenuItem.id', "MenuItem->MenuItemCategory.id"],
        })
        return menuItemsWithSoldQuantities;
    }
}

module.exports = MaterialService;
