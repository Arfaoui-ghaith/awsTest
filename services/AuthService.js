const { Shop, Employee, Role, RoleCategory, Attendance, Company, PosSetup, BillTemplate } = require("../models");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const JWTService = require('./JWTService');
const EmailService = require('../utility/email.utility');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json').env[env];
const jwt = require('jsonwebtoken');

// for building tokens we gonna use in requests
const signToken = (payload) => {
    return jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
class AuthService {
    static async loginShop(shopLoginParams) {
        const { email, password } = shopLoginParams;
        //to do remove return of pin and password
        const employee = await Employee.findOne({ where: { email }, include: [Company,{model: Shop, include: [PosSetup]}] });
        console.log(employee)
        
        let employeeJson = employee && employee.toJSON();
        if (!employeeJson) {
            throw Error('Invalid email/password');
        }
        if (employeeJson && !employeeJson.isActive) {
            throw Error('Your account have not been activated.');
        }

        if(employeeJson.Company){
            let date = new Date();
            let startDate = new Date(employeeJson.Company.startDate);
            let endDate = new Date(employeeJson.Company.endDate);
            if(!(date.getTime() >= startDate.getTime() &&  date.getTime() <= endDate.getTime())){
                await Company.update({ isActive: false}, { where:{ id: employeeJson.Company.id } });
                throw Error('Your company is out the activition date range, Please contact the support team!');
            }else{
                await Company.update({ isActive: true}, { where:{ id: employeeJson.Company.id } });
            }
        }

        if (employeeJson.Company){
            if(!employeeJson.Company.isActive){
                throw Error('Your company have not been activated.');
            }
        }
        
        const passwordMatch = await bcrypt.compare(password, employee.password);
        if (!passwordMatch) {
            throw Error('Invalid password')
        }

        if(employee.RoleId){
            let roles = await Role.findByPk(employee.RoleId)
            employeeJson = { roles , ...employeeJson }
        }

        if(employee.RoleCategoryId){
            let rolesCategory = await RoleCategory.findByPk(employee.RoleCategoryId)
            employeeJson = { rolesCategory , ...employeeJson }
        }

        delete employeeJson.password;
        delete employeeJson.pin;
        
        let token = signToken(employeeJson)

        const roleCategory = await RoleCategory.findByPk(employee.RoleCategoryId);
        if(roleCategory){
            if(roleCategory.name == 'SUPER_ADMIN'){
                employeeJson.displayName = 'POS';
            }
            if(roleCategory.name == 'COMPANY_ADMIN' && employee.Company)
            {
                employeeJson.displayName = employee.Company.name
            }
            if(roleCategory.name == 'BRANCH_ADMIN' || roleCategory.name == 'EMPLOYEE'){
                if(employee.Shop){
                    employeeJson.displayName = employee.Shop.name
                }
            }
    
        }
        
        return {user: employeeJson, token};
    }

    static async loginEmployee(employeeLoginParams) {
      //to do remove return of pin and password
        const { shopId, pin, companyId, isSelf = false } = employeeLoginParams;
        if (!shopId) {
            throw Error('Admin is required to login first');
        }
        const shop = await Shop.findByPk(shopId);
        

        if (!shop) {
            throw Error('Invalid shop Id')
        }

        const pos = await PosSetup.findOne({ where: { ShopId: shopId } })

        let employee;
        if (!isSelf) {
            employee = await Employee.findOne({
                where: {
                    pin,
                    ShopId: shopId
                }, include: [Role,RoleCategory,Shop,Company]
            })
        } else {
            employee = await Employee.findOne({
                where: {
                    pin,
                    CompanyId: companyId
                }, include: [Role,RoleCategory,Shop,Company]
            })
        }
        if (!employee) {
            throw Error('No employee found with the provided pin')
        }

        if(employee.Company){
            let date = new Date();
            let startDate = new Date(employee.Company.startDate);
            let endDate = new Date(employee.Company.endDate);
            if(!(date.getTime() >= startDate.getTime() &&  date.getTime() <= endDate.getTime())){
                await Company.update({ isActive: false}, { where:{ id: employee.Company.id } });
                throw Error('Your company is out the activition date range, Please contact the support team!');
            }
        }else{
            await Company.update({ isActive: true}, { where:{ id: employee.Company.id } });
        }

        if (employee.Company){
            if(!employee.Company.isActive){
                throw Error('Your company have not been activated.');
            }
        }

        delete employee.dataValues.password;
        delete employee.dataValues.pin;

        employee.dataValues.PosSetup = pos.dataValues
        const billTemplate = await BillTemplate.findOne({ where: { ShopId: pos.ShopId } });
        let header = null;
        let footer = null;
        if(billTemplate){
            header = billTemplate.header;
            footer = billTemplate.footer;
        }

        employee.dataValues.PosSetup.header = header;
        employee.dataValues.PosSetup.footer = footer;
       
        const token = signToken(employee)
        const attendances = await Attendance.findAll({ where: { EmployeeId: employee.id }, order: [['createdAt', 'DESC']] });
        const clockedInAlready = attendances.length && !attendances[0].clockOutTime;
        
        
        let displayName="";
        const roleCategory = await RoleCategory.findByPk(employee.RoleCategoryId);
        if(roleCategory){
            if(roleCategory.name == 'SUPER_ADMIN'){
                displayName = 'POS';
            }
            else if(roleCategory.name == 'COMPANY_ADMIN' && employee.Company)
            {
                displayName = employee.Company.name
            }
            else{
                if(employee.Shop){
                    displayName = employee.Shop.name
                }
                
            }
    
        }
        
        return { employee: {...employee.dataValues,PosSetup: {...pos.dataValues, header, footer}, displayName}, token, clockedInAlready };
    }

    static async getSessionInfo(sessionParams) {
        const { token } = sessionParams;
        // const shop = await Shop.findByPk(shopId);
        const employee = jwt.verify(token, process.env.JWT_SECRET);

        console.log(employee)
        
        const attendances = await Attendance.findAll({ where: { EmployeeId: employee.payload.id }, order: [['createdAt', 'DESC']] });
        const clockedInAlready = attendances.length && !attendances[0].clockOutTime;

        delete employee.payload.password;
        delete employee.payload.pin;
        
        return { employee: employee.payload, token, clockedInAlready };
    }

    static async registerCompany(payload) {
        const { email, password, name } = payload;
        const checkCompany = await Company.findOne({ where: { name } });
        if (checkCompany) {
            throw Error('Company already exists')
        }
        const { id: roleId = null } = (await Role.findOne({ where: { name: 'COMPANY_ADMIN' } })).toJSON();
        const encryptPassword = await bcrypt.hash(password, 10);
        const { id: companyId } = (await Company.create({
            id: uuidv4(),
            name,
            isActive: false
        })).toJSON();
        const user = {
            id: uuidv4(),
            RoleId: roleId,
            CompanyId: companyId,
            name,
            email,
            registrationToken: uuidv4(),
            password: encryptPassword,
            isActive: false,
        }
        const { registrationToken } = (await Employee.create(user)).toJSON();
        const toEmail = [email];
        const emailPayload = {
            link: `${config.url}api/v1/auth/company/${companyId}/activate/${registrationToken}`
        }
        EmailService.send(toEmail, emailPayload);
        return {
            message: "Company registered successfully, please check your email for login details",
        };
    }

    static async activateCompany(params) {
        const { companyId, token } = params;
        console.log(companyId, token);
        const checkCompany = await Company.findOne({ where: { isActive: false, id: companyId } });
        const checkEmployee = await Employee.findOne({ where: { isActive: false, CompanyId: companyId, registrationToken: token } });
        if (!checkCompany && checkEmployee) {
            throw Error('Invalid Request');
        }
        checkCompany.isActive = true;
        await checkCompany.save();
        checkEmployee.isActive = true;
        checkEmployee.registrationToken = null;
        checkEmployee.pin = 1234; // will change in future [Random]
        await checkEmployee.save();
        return {
            message: "Company verified successfully, please login",
        };
    }
}

module.exports = AuthService;
