const { Company, Country, Shop, RoleCategory } = require("../models");
const { v4: uuidv4 } = require('uuid');

class CompanyService {
    static async addCompany(companyParams) {
        const {name, description, isActive, isDeletable, CountryId, startDate, endDate, maxShops, maxEmployees} = companyParams;
        // Check for empty params and countryId values
        
        if(!(name || CountryId || startDate || endDate || maxShops || maxEmployees)) {
            throw Error('Atleast one out of "name", "CountryId" or "startDate" or "endDate" or "maxShops" or "maxEmployees" is required')
        }

        if(name.trim() == ""){
            throw Error('Name is needed for company!')
        }

        const country = await Country.findByPk(CountryId);
        if(!country) {
            throw Error('Country not found for the given CountryId');
        }

        const company = await Company.create({
            id: uuidv4(),
            ...companyParams
        })
        
        return company;
    }

    static async getCompany(companyId) {
        const company = await Company.findByPk(companyId);
        return company
    }

    static async getAllCompanies(user) {
        
        if(!user.RoleCategoryId){
            throw Error("User has no role category.");
        }
        let roleCategory = await RoleCategory.findByPk(user.RoleCategoryId);

        if(roleCategory.name == 'SUPER_ADMIN'){
            const companies = await Company.findAll({ include:[Shop] });
            return companies;
        }
        if(roleCategory.name == 'COMPANY_ADMIN'){
            if(!user.CompanyId){
                throw Error('User has no companies')
            }
            const companies = await Company.findAll({ where: { id: user.CompanyId }, include:[Shop] });
            return companies;
        }
        if(roleCategory.name == 'BRANCH_ADMIN'){
            if(!user.CompanyId){
                throw Error('User has no company');
            }
            if(!user.ShopId){
                throw Error('User has no shop');
            }
            const companies = await Company.findAll({ where: { id: user.CompanyId }, include:{model: Shop, where: {id: user.ShopId}} });
            return companies;
        }
        
        
    }

    static async updateCompany(companyId,companyParams) {
        if(companyParams.name){
            if(companyParams.name.trim() == ""){
                throw Error('Name is needed for company!')
            }
        }
        const company = await Company.update(companyParams, { where: { id: companyId },returning: true });
        return company[1][0]
    }

    static async deleteCompany(companyId) {
        const company = await Company.findByPk(companyId);
        if (!company) {
            throw Error('No company found for the given Id.')
        }
        if (company.isDeletable) {

            return await Company.update({isActive: false}, { where: { id: companyId },returning: true });

        } else {
            throw Error('[ALREADY IN USE] Cannot delete the company which are in action!');
        }
    }

    
}

module.exports = CompanyService;