const { v4: uuidv4 } = require('uuid');
const JWT = require('jsonwebtoken');
const moment  = require('moment');
const { Employee, Role } = require("../models");

const JWT_SECRET = '04i-293u4-0234';

class JWTService {
    static validJWTS = {};

    static generateJWT(employeeId) {
        const payload = {
            employeeId,
            random: uuidv4(),
            expireAt: "1000d",
        };
        return JWT.sign(payload, JWT_SECRET);
    }

    static async addJWTToken({jwtToken, user}) {
        if (this.validJWTS[user.id]) {
            this.validJWTS[user.id].push(jwtToken);
        } else {
            this.validJWTS[user.id] = [jwtToken];
        }
    }

    static async removeJWTToken({jwtToken, user}) {
        if (this.validJWTS[user.id]) {
            const index = this.validJWTS[user.id].indexOf(jwtToken);
            if (index >= 0) {
                this.validJWTS[user.id].splice(index, 1);
            }
        }
    }

    static async getEmployeeFromJWT(jwtToken){
        try {
            const decoded = JWT.verify(jwtToken, JWT_SECRET);
            const {employeeId} = decoded;
            const employee = await Employee.findByPk(employeeId, {include: [Role]});
            return employee;
        } catch (e) {
            return null;
        }
    }
}

module.exports = JWTService;
