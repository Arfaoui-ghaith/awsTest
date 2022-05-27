const ShopService = require("./ShopService");
const { Table } = require("../models");
const { v4: uuidv4 } = require('uuid');

class TableService {
    static async createTable(tableParams) {
        const {shopId, name, description, noOfPerson } = tableParams;
        const shop = await ShopService.getShopById(shopId);

        if(!name){
            throw Error('Name is needed for table!')
        }

        const tables = await Table.findAll({ where: { name, ShopId: shop.id } })
        if(tables.length > 0){
            throw Error('Table name already used!')
        }

        // const tableWithSameNameExists = await Table.findOne({ where: {name: name}});
        // if (tableWithSameNameExists) {
        //     throw Error('No table found for the given ID')
        // }
        const table = await Table.create({
            id: uuidv4(),
            name,
            description,
            noOfPerson
        });
        await shop.addTable(table);
        return table;
    }

    static async getAllTables(shopId) {
        const tables = await Table.findAll({where: {ShopId: shopId, isActive: true}});
        return tables;
    }

    static async updateTable(tableParams) {
        const {id, name, description, noOfPerson} = tableParams;
        if (!id) {
            throw Error('Table ID is required to update the table');
        }
        const table = await Table.findByPk(id);

        if(name && name != table.name){
            const tables = await Table.findAll({ where: { name, ShopId: table.ShopId } })
            if(tables.length > 0){
                throw Error('Table name already used!')
            }
            table.name = name;
        }
       

        if (!table) {
            throw Error('No table found for the given ID')
        }
        // else if (table.name === name) {
        //     throw Error('Table with same name already exists!')
        // }
        table.description = description || table.description;
        table.noOfPerson = noOfPerson || table.noOfPerson;
        await table.save();
        return table;
    }

    static async deleteTable(tableId) {
        const table = await Table.findByPk(tableId);
        if (!table) {
            throw Error('No Table found for the given Id.')
        }
        if (table.isDeletable) {
            return await Table.update({isActive: false},{where: {id: tableId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the table which was is used in billing!');
        }
    }
}

module.exports = TableService;
