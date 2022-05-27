const ShopService = require("./ShopService");
const { Session, Employee, Bill } = require("../models");
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

class SessionService {
    static async createSession(sessionParams) {
        let {shopId, date, startCash, employeeId} = sessionParams;
        const shop = await ShopService.getShopById(shopId);
        if(!shop) {
            throw Error('Shop not found');
        }
        if(!employeeId) {
            throw Error('Employee id required to start a session.');
        }
        const employee = await Employee.findByPk(employeeId);
        if(!employee) {
            throw Error('Invalid employee id provided.');
        }
        const sessionExists = await Session.findAll({where: {ShopId: shopId}, order: [['createdAt', 'DESC']]})
        if(sessionExists[0] && !sessionExists[0].endedBy) {
            throw Error('A session is already in progress')
        }
        const startDate=date+'T00:00:00.000Z'
        const endDate=date+'T23:59:59.000Z'
        const existingSessions = await Session.findAll({where: {ShopId: shopId, date: {[Op.between]: [startDate, endDate]}}});

        const sessionName = `${date}-session${existingSessions.length+1}`
        const session = await Session.create({
            id: uuidv4(),
            name: sessionName,
            date,
            startCash,
            endCash: 0,
            startedBy: employeeId
        });
        await shop.addSession(session);

        // Update employee to be non deletable
        //employee.isDeletable = false;
        await employee.save();

        return session;
    }

    static async getAllSessions(shopId, startDate, endDate) {
        // const sessions = await Session.findAll({where: {ShopId: shopId}, include: [{model: Employee, as: 'startedBy'}]});
        let sessions;
        if(!startDate) {
            sessions = await Session.findAll({where: {ShopId: shopId}, include: [Bill]});
        }
        else {
            startDate += 'T00:00:00.000Z'
            endDate += 'T23:59:59.000Z'
            sessions = await Session.findAll({where: {ShopId: shopId,
                [Op.or]: [{createdAt: {[Op.between]: [startDate, endDate]}}, {endedAt: {[Op.between]: [startDate, endDate]}},
                    { [Op.and]: [{createdAt: {[Op.lte]: startDate}}, {endedAt: {[Op.gte]: endDate}} ] }] } , include: [Bill]});
        }

        const updatedSessions = [];
        for(let session of sessions) {
            const startingEmployee = await Employee.findByPk(session.startedBy)
            const endingEmployee = await Employee.findByPk(session.endedBy);
            if(endingEmployee) {
                updatedSessions.push({...session.dataValues, startingEmployee: startingEmployee.dataValues, endingEmployee: endingEmployee.dataValues})
            }
            else updatedSessions.push({...session.dataValues, startingEmployee: startingEmployee.dataValues, endingEmployee: null})
        }
        return updatedSessions;
    }

    static async getAllSessionsByCreatedAt(shopId, startDate, endDate) {
    
        let sessions = await Session.findAll({where: {ShopId: shopId, createdAt: {[Op.between]: [startDate, endDate]}}, include: [Bill]});
       
        return sessions;
    }

    static async getCurrentSession(shopId) {
        const shop = await ShopService.getShopById(shopId);
        if(!shop) {
            throw Error('Shop not found');
        }
        const session = await Session.findAll({where: {ShopId: shopId}, order: [['createdAt', 'DESC']] })
        if (!session[0] || session[0].endCash && session[0].endedBy) {
            throw Error('No Active session is present, create a new one!')
        }
        return session[0];
    }

    static async updateSession(sessionParams) {
        const {id, endCash, endedAt, employeeId} = sessionParams;
        if(!employeeId) {
            throw Error('Employee id required to update the session.');
        }
        const employee = await Employee.findByPk(employeeId);
        if(!employee) {
            throw Error('Invalid employee id provided.');
        }
        const session = await Session.findByPk(id);

        if (!session) {
            throw Error('Session not found for the given ID');
        }

        session.endCash = endCash;
        session.endedBy = employeeId;
        session.endedAt = endedAt;
        await session.save();

        // Update employee to be non deletable
        //employee.isDeletable = false;
        await employee.save();

        return session;
    }
}

module.exports = SessionService;
