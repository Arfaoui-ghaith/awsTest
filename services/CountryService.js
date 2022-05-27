const { Country } = require("../models");
const { v4: uuidv4 } = require('uuid');

class CountryService {
    static async addCountry(countryParams) {
        const {name, description, currency, currencySymbol, isActive, isDeletable} = countryParams;
        // Check for empty params values
        
        if(!(name || description || currency || currencySymbol || isActive || isDeletable)) {
            throw Error('Atleast one out of "name", "description", "currency", "currencySymbol", "isActive", "isDeletable" is required')
        }

        const country = await Country.create({
            id: uuidv4(),
            ...countryParams
        })
        
        return country;
    }

    static async getCountry(countryId) {
        const country = await Country.findByPk(countryId);
        return country
    }

    static async getAllCountries() {
        const countries = await Country.findAll({ where: { isActive: true } });
        return countries
    }

    static async updateCountry(countryId,countryParams) {
        const country = await Country.update(countryParams, { where: { id: countryId },returning: true });
        return country[1][0]
    }

    static async deleteCountry(countryId) {
        const country = await Country.findByPk(countryId);
        if (!country) {
            throw Error('No company found for the given Id.')
        }
        if (country.isDeletable) {

            return await Country.update({isActive: false}, { where: { id: companyId },returning: true });

        } else {
            throw Error('[ALREADY IN USE] Cannot delete the company which are in action!');
        }
    }

    
}

module.exports = CountryService;