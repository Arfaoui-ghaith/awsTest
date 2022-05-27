const { Shop, Employee, Role, RoleCategory, PosSetup, Company,Country, Material, Store, Printer, Table } = require("../models");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const PosSetupService = require('./PosSetupService');
const ImageService = require('./ImageService');
const EmailService = require('../utility/email.utility');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const shop = require("../models/shop");

class ShopService {
    
    static async createShop(shopParams) {
        const {name, CountryId, CompanyId, logo, billSeries, ipAddress} = shopParams;
        
        if(name){
            if(name.trim() == ""){
                throw Error('Name is needed for Shop!')
            }
        }

        if(shopParams.password) {
            let encryptPassword = await bcrypt.hash(shopParams.password, 10);
            shopParams.password = encryptPassword;
        }else{
            delete shopParams.password
        }

        const company = await Company.findByPk(CompanyId);
        if(!company){
            throw Error('No companies found for the id given.')
        }

        if(CountryId){
            const country = await Country.findByPk(CountryId);
            if(!country){
                throw Error('No countries found for the id given.')
            }
        }

        const shop = await Shop.create({
            id: uuidv4(),
            ...shopParams
        });

        let qrCode;
        var content;
        let imageQRCode;
        if(name){
            
            qrCode = await QRCode.toFile(`${shop.id}.png`, `${process.env.REACT_APP_DOMAIN_NAME}/menu/${name}`);

            content = fs.readFileSync(`./${shop.dataValues.id}.png`);
            console.log(content);

            try {
                fs.unlinkSync(`./${shop.dataValues.id}.png`)
            } catch(err) {
                console.error(err.message)
            }
            imageQRCode = await ImageService.uploadImageByURL(content);
            console.log(imageQRCode);
        }
        
        const pos = await PosSetupService.createPosSetup({ShopId: shop.id, image: imageQRCode.url_preview, logo, billSeries, ipAddress});
        return {shop,pos};
    }

    static async getShopById(shopId) {
        if (!shopId) {
            throw Error('No shopId provided!');
        }
        const shop = await Shop.findOne({ where: { id: shopId }, include: [PosSetup]});
        if(!shop) {
            throw Error('No shop with the given id found.');
        }
        return shop;
    }

    static async getEmployeeById(employeeId) {
        if (!employeeId) {
            throw Error('No employeeId provided!');
        }
        const employee = await Employee.findByPk(employeeId);
        if(!employee) {
            throw Error('No employee with the given id found.');
        }
        return employee;
    }

    static async getPosSetupByShopId(shopId) {
        if (!shopId) {
            throw Error('No shopId provided!');
        }
        const shop = await Shop.findOne({  where: {id: shopId}, include: [PosSetup]});
        if(!shop) {
            throw Error('No shop with the given id found.');
        }
        if(!shop.PosSetup) {
            throw Error('No store for this shop.');
        }
        return shop.PosSetup;
    }

    static async checkIfShopExists(shopId) {
        const shop = await Shop.findByPk(shopId);
        if(!shop) {
            throw Error('Shop not found');
        }
    }

    static async getAllShops(user) {
        if(!user.RoleCategoryId){
            throw Error("User has no role category.");
        }
        let roleCategory = await RoleCategory.findByPk(user.RoleCategoryId);

        if(roleCategory.name == 'SUPER_ADMIN'){
            throw Error("No Shops for super admin.");
        }
        if(roleCategory.name == 'COMPANY_ADMIN'){
            if(!user.CompanyId){
                throw Error('User has no companies')
            }
            const shops = await Shop.findAll({ where: { CompanyId: user.CompanyId }, include:{model: PosSetup} });
            return shops;
        }
        if(roleCategory.name == 'BRANCH_ADMIN' || roleCategory.name == 'EMPLOYEE'){
            if(!user.ShopId){
                throw Error('User has no shop');
            }
            const shop = await Shop.findAll({ where: {id: user.ShopId}, include:{model: PosSetup}});
            return shop;
        }
    }

    // role id problem
    static async addEmployee(employeeParams,user){

        if(!employeeParams.RoleCategoryId){
            throw Error('Role Category is required for creation of an employee.')
        }
        const roleCategory = await RoleCategory.findByPk(employeeParams.RoleCategoryId);
        
        if(!roleCategory) {
            throw Error('Role Category not found for given roleId');
        }

        let userRoleCategory = await RoleCategory.findByPk(user.RoleCategoryId);
        if(!userRoleCategory){
            throw Error('User has no role category')
        }
        if(userRoleCategory.name == 'EMPLOYEE'){
            if(!(roleCategory.name == 'EMPLOYEE'))
            throw Error("Your role category can allow only adding an employee.")
            if(!employeeParams.RoleId){
                throw Error('Role is required')
            }
            let role = await Role.findByPk(employeeParams.RoleId);
            if(!role){
                throw Error('No roles with the role given.')
            }
        }

        if(userRoleCategory.name == 'SUPER_ADMIN'){
            if(!(roleCategory.name == 'SUPER_ADMIN' || roleCategory.name == 'COMPANY_ADMIN'))
            throw Error("Your role category can allow only adding an super admin or company admin.")
        }

        if(userRoleCategory.name == 'COMPANY_ADMIN'){
            if(!(roleCategory.name == 'COMPANY_ADMIN' || roleCategory.name == 'BRANCH_ADMIN'))
            throw Error("Your role category can allow only adding an branch admin or company admin.")
        }

        if(userRoleCategory.name == 'BRANCH_ADMIN'){
            if(!(roleCategory.name == 'BRANCH_ADMIN' || roleCategory.name == 'EMPLOYEE'))
            throw Error("Your role category can allow only adding an branch admin or employee.")
            if(roleCategory.name == 'EMPLOYEE'){
                if(!employeeParams.RoleId){
                    throw Error('Role is required')
                }
                let role = await Role.findByPk(employeeParams.RoleId);
                if(!role){
                    throw Error('No roles with the role given.')
                }
            }
        }
       
        if(employeeParams.name){
            if(employeeParams.name.trim() == ""){
                throw Error('Name is needed for User!')
            }
            employeeParams.name=employeeParams.name.trim()
        }

        if(employeeParams.email){
            employeeParams.email=employeeParams.email.trim()
        }
        

        if(employeeParams.email){
            let email = await Employee.findOne({ where: {email:employeeParams.email} })
            if(email){
                throw Error('Email already in use.');
            }
        }

        if(employeeParams.pin || employeeParams.ShopId ){
            if(!employeeParams.pin){
                delete employeeParams.pin
                throw Error('Pin required when shopId exist in the body')
            }
            if(!employeeParams.ShopId){
                delete employeeParams.ShopId
                throw Error('Shop Id in required when pin exist in the body.');
            }
            let shop = await Shop.findByPk(employeeParams.ShopId);
            if(!shop){
                delete employeeParams.ShopId
                throw Error('No Shops with the shopId given.');
            }
            employeeParams.pin = employeeParams.pin+""
            let pinShop = await Employee.findOne({ where: {pin:employeeParams.pin, ShopId:employeeParams.ShopId} })
            if(pinShop){
                delete employeeParams.pin
                throw Error('Pin already in use for that shop.');
            }
        }

        let originalPass = employeeParams.password;
        if(employeeParams.password) {
            let encryptPassword = await bcrypt.hash(employeeParams.password, 10);
            employeeParams.password = encryptPassword;
        }else{
            delete employeeParams.password
        }

        const employee = await Employee.create({
            id: uuidv4(),
            ...employeeParams
        });


        const emp = await Employee.findOne({ where:{ id: employee.id }, include:[Company,Shop] });
        
        let shopName;
        let companyName;
        let pin;
        let email;
        let password;

        emp.Shop ? shopName = emp.Shop.name : shopName = null
        emp.Company ? companyName = emp.Company.name : companyName = null
        emp.pin ? pin = emp.pin : pin = null
        emp.email ? email = emp.email : email = null
        emp.password ? password = employeeParams.password : password = null

        const emailPayload = {
                //link: `${config.url}api/v1/auth/company/${companyId}/activate/${registrationToken}`
                link: `${process.env.REACT_APP_DOMAIN_NAME}/admin-login`,
                subject: 'Welcome to POS',
                shopName,
                companyName,
                pin,
                email,
                password: originalPass,
                TextPart: 'Employee registered successfully, please check the link for login',
                email: employee.email,
                name: employee.name
            }
        EmailService.send(emailPayload);
            /*return {
                message: "Company registered successfully, please check your email for login details",
            };*/

        return {...employee.dataValues,message: "Employee registered successfully, please check your email for login details"};
    }

    static async addEmployeeToShop(employeeParams) {
        
        let {shopId, name, password, pin, roleId, roleCategoryId, email, CompanyId} = employeeParams;
        // Check for empty shop and roleId values
        /*if(!shopId) {
            throw Error('Shop is required for creation of an employee.')
        }*/
        if(!roleId) {
            throw Error('Role is required for creation of an employee.')
        }

        const role = await Role.findByPk(roleId);

        
        if(!role) {
            throw Error('Role not found for given roleId');
        }

        if(!roleCategoryId) {
            throw Error('Role Category is required for creation of an employee.')
        }
        console.log("im here -1")
        const roleCategory = await RoleCategory.findByPk(roleCategoryId);

        
        if(!roleCategory) {
            throw Error('Role Category not found');
        }
        console.log("im here 0")
        // Check if role with same name exists or not
        const employeeExists = await Employee.findOne({ where: {name, isActive: true}});
        if (employeeExists) {
            throw Error("Employee with same name already exists, please try some other names!");
        }

        const company = await Company.findByPk(CompanyId);

        if(pin){
            // Check if shop and role exists for the corresponding the ids
            if(!shopId) {
                throw Error('Shop is required for creation of an employee.')
            }
            const shop = await Shop.findByPk(shopId);
                
            if(!shop) {
                throw Error('Shop not found for the given shopId');
            }
            if(roleCategory.name !== 'EMPLOYEE' ){
                throw Error('Pin only for employees, Please select the right role');
            }
            console.log("im here 2")
            const pinAlreadyExists = await Employee.findOne({where: { pin: pin+"", ShopId: shopId }});
            if(pinAlreadyExists) {
                throw Error('Pin already in use.')
            }

            if(password) {
                let encryptPassword = await bcrypt.hash(password, 10);
                password = encryptPassword;
            }
            
            const employee = await Employee.create({
                id: uuidv4(),
                name,
                pin,
                RoleId: roleId,
                CompanyId,
                ShopId: shopId,
                RoleCategoryId: roleCategoryId,
                email,
                password
            });

            
            company.isDeletable = false;
            company.save();
            shop.isDeletable = false;
            shop.save();
        }else{
            if(roleCategory.name == 'EMPLOYEE' ){
                throw Error('Pin only for employees, Please select the right role');
            }
            if(roleCategory.name !== 'COMPANY_ADMIN' ){
                shopId = null;
            }else{
                shopId = null;
                CompanyId = null;
            }
            console.log("im here 11")
                const encryptPassword = await bcrypt.hash(password, 10);
                const employee = await Employee.create({
                    id: uuidv4(),
                    name,
                    password: encryptPassword,
                    pin,
                    RoleId: roleId,
                    RoleCategoryId: roleCategoryId,
                    CompanyId,
                    ShopId: shopId,
                    email
                });

                company.isDeletable = false;
                company.save();

                return employee;
        }
        
        
        
        /*await shop.addEmployee(employee)
        // Update the roleId to be non deletable
        role.isDeletable = false
        await role.save()*/
        
    }

    static async getShop(shopLoginParams) {
        try {
            const { email, password} = shopLoginParams;
            const shop = await Shop.findOne({where: {email}});
            if(!shop) {
                throw Error('Invalid email')
            }
            const passwordMatch = await bcrypt.compare(password, shop.password);
            if(!passwordMatch) {
                throw Error('Invalid password')
            }
            return shop;
        } catch (e) {
            console.log(e);
            console.log('Error while creating employee')
        }
    }

    static async updateEmployee(employeeParams) {
        console.log("im here **************************************")
        let {id, name, password, pin, roleId, RoleCategoryId, isActive, shopId, CompanyId} = employeeParams;

        const employee = await Employee.findByPk(id);
        if(!employee) {
            throw Error('No employee with the given id found');
        }
        
        if(name){
            if(name.trim() == ""){
                throw Error('Name is needed for User!')
            }
            name=name.trim()
        }

        if(shopId == undefined || shopId == "undefined"){
            shopId = null
        }

        if(shopId){
            const shop = await Shop.findByPk(shopId);
            if(!shop){
                throw Error('No shop found with the given id.')
            }
            employee.ShopId = shop.id
        }

        
        if (pin && employee.pin !== pin) {
            const pinAlreadyExists = await Employee.findOne({where: {
                    pin,
                    ShopId: shopId
                }});
            if(pinAlreadyExists) {
                throw Error('Pin already in use.')
            }
        }
        // Check if role with same name exists or not
        if (name && name !== employee.name) {
            const employeeExists = await Employee.findOne({ where: {name, isActive: true}});
            if (employeeExists) {
                throw Error("Employee with same name already exists, please try some other names!");
            }
        }
        if(password) {
            let encryptPassword = await bcrypt.hash(password, 10);
            password = encryptPassword;
        }
        employee.name = name || employee.name;
        employee.CompanyId = CompanyId || employee.CompanyId;
        employee.RoleId = roleId || employee.RoleId;
        employee.RoleCategoryId = RoleCategoryId || employee.RoleCategoryId;
        employee.pin = pin || employee.pin;
        employee.password = password || employee.password;
        employee.isActive = isActive ? isActive : employee.isActive;
        await employee.save();
        return employee;
    }

    static async getEmployees(companyId,shopId,user) {

        // if he shop admin filter employees with role category name [branch admin, employee]

        //console.log(user)
        /*let branchAdminRole = await RoleCategory.findOne({ where: { name: 'BRANCH_ADMIN' } });
        let employeeRole = await RoleCategory.findOne({ where: { name: 'EMPLOYEE' } });*/

        // super admin => super admin and company admin
        // company admin => company admin him self and branch 
        // branch admin => branch admin him self and the employees of his shop

        if(!user.RoleCategoryId){
            throw Error("User has no role category.");
        }
        let roleCategory = await RoleCategory.findByPk(user.RoleCategoryId);

        if(roleCategory.name == 'SUPER_ADMIN'){
            const employees = await Employee.findAll({ include:[RoleCategory,{model: Company, attributes: ['name']}] });
            let employeesJSON = employees.filter((e) => {
                if(e.RoleCategory){
                    if(['SUPER_ADMIN','COMPANY_ADMIN'].includes(e.RoleCategory.name)){
                        return e
                    } 
                }
            });
            return employeesJSON;
        }

        if(roleCategory.name == 'COMPANY_ADMIN'){
            const employees = await Employee.findAll({ where:{ CompanyId: user.CompanyId }, include:[RoleCategory] });
            let employeesJSON = employees.filter((e) => {
                if(e.RoleCategory){
                    if(['BRANCH_ADMIN','COMPANY_ADMIN','EMPLOYEE'].includes(e.RoleCategory.name)){
                        return e
                    } 
                }
            });
            return employeesJSON;
        }

        if(roleCategory.name == 'BRANCH_ADMIN'){
            const employees = await Employee.findAll({ where:{ ShopId: user.ShopId }, include:[RoleCategory] });
            let employeesJSON = employees.filter((e) => {
                if(e.RoleCategory){
                    if(['BRANCH_ADMIN','EMPLOYEE'].includes(e.RoleCategory.name)){
                        return e
                    }
                }
            });
            return employeesJSON;
        }

        if(roleCategory.name == 'EMPLOYEE'){
            const employees = await Employee.findAll({ where:{ ShopId: user.ShopId }, include:[RoleCategory] });
            let employeesJSON = employees.filter((e) => {
                if(e.RoleCategory){
                    if(['EMPLOYEE'].includes(e.RoleCategory.name)){
                        return e
                    }
                }
            });
            return employeesJSON;
        }
        /*if(roleCategory.name == 'COMPANY_ADMIN'){
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
        
        return employees;*/
    }

    static async deleteEmployee(employeeId,user) {
        if(employeeId == user.id){
            throw Error("You can't delete your self.")
        }
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            throw Error('No Employee found for the given Id.')
        }
        if (employee.isDeletable) {
            return await Employee.destroy({where: {id: employeeId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the employee which are in action!');
        }
    }

    static async deleteShop(ShopId) {
        const shop = await Shop.findByPk(ShopId);
        if (!shop) {
            throw Error('No Shop found for the given Id.')
        }
        if (shop.isDeletable) {
            let posSetup = await PosSetupService.deletePosSetup(shop.id);
            let shopJSON = await Shop.destroy({where: {id: ShopId}});
            return shopJSON;
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the shop which are in action!');
        }
    }

    static async updateShop(ShopId,shopParams) {
        const { name, CountryId, CompanyId, password, email, currency, logo, timeFormat, enableScanner, storeId, image, isActive, isDeletable, billSeries, ipAddress } = shopParams;
        const shop = await Shop.findByPk(ShopId);
        if (!shop) {
            throw Error('No Shop found for the given Id.');
        }
        if(CompanyId){
            const company = await Company.findByPk(CompanyId)
            if(!company){
                throw Error('No Company found for the given Id.');
            }
            shop.CompanyId = company.id;
        }
        if(CountryId){
            const country = await Country.findByPk(CountryId)
            if(!country){
                throw Error('No Country found for the given Id.');
            }
            shop.CountryId = country.id;
        }
        
        if(password) {
            let encryptPassword = await bcrypt.hash(password, 10);
            shop.password = encryptPassword;
        }

        let posParams = {currency, logo, timeFormat, enableScanner, storeId, billSeries, ipAddress}

        let qrCode;
        var content;
        let imageQRCode;
        if(name && !image){
            
            qrCode = await QRCode.toFile(`${shop.id}.png`, `${process.env.REACT_APP_DOMAIN_NAME}/menu/${name}`);

            content = fs.readFileSync(`./${shop.dataValues.id}.png`);
            console.log(content);

            try {
                fs.unlinkSync(`./${shop.dataValues.id}.png`)
            } catch(err) {
                console.error(err.message)
            }
            imageQRCode = await ImageService.uploadImageByURL(content);
            console.log(imageQRCode);
            posParams.image = imageQRCode.url_preview
        }

        shop.email = email || shop.email;
        shop.name = name || shop.name;
        shop.isActive = isActive || shop.isActive;
        shop.isDeletable = isDeletable || shop.isDeletable;
       
        shop.save();
        let pos = await PosSetupService.updatePosSetup(posParams,shop.id);
        
        return {shop, pos};
    }
}

module.exports = ShopService;
