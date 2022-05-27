const { Shop, Customer } = require("../models");
const ShopService = require('../services/ShopService');
const { v4: uuidv4 } = require('uuid');

class CustomerService {
    static async addCustomer(customerParams) {
        const {shopId, name, phoneNumber, vehicleNumber} = customerParams;
        // Check for empty shop and roleId values
        if(!shopId) {
            throw Error('Shop is required for creation of an customer.')
        }
        if(!(name || phoneNumber || vehicleNumber)) {
            throw Error('Atleast one out of "name", "phoneNumber" or "vehicleNumber" is required')
        }
        // Check if shop and role exists for the corresponding the ids
        const shop = await Shop.findByPk(shopId);
        if(!shop) {
            throw Error('Shop not found for the given shopId');
        }

        const customer = await Customer.create({
            id: uuidv4(),
            name,
            phoneNumber,
            vehicleNumber,
        })
        await shop.addCustomer(customer)
        return customer;
    }

    static async getCustomers(shopId) {
        await ShopService.getShopById(shopId);
        const customers = await Customer.findAll({ where: { ShopId: shopId, isActive: true } });
        return customers;
    }

    static async searchCustomers(shopId,{customerParams}) {
        const {name,phoneNumber,vehicleNumber} = customerParams;
        await ShopService.getShopById(shopId);

        const customers = await Customer.findAll({ where: { ShopId: shopId, isActive: true } });

        let result = customers.filter(el => {
            if(el.name.indexOf(name) > -1 || el.phoneNumber.startWith(phoneNumber) || el.vehicleNumber.startWith(vehicleNumber) ){
                return el;
            }
        });

        return result;
    }

    static async deleteCustomer(customerId) {
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            throw Error('No Customer found for the given Id.')
        }
        if (customer.isDeletable) {
            return await Customer.update({isActive: false},{where: {id: customerId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the customer which are in action!');
        }
    }
}

module.exports = CustomerService;
