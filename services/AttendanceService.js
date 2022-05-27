const {Op} = require("sequelize");
const { Shop, Employee, Attendance } = require("../models");
const { v4: uuidv4 } = require('uuid');

class AttendanceService {
    static async addClockIn(attendanceParams) {
        const {shopId, time, employeeId} = attendanceParams;
        const shop = await Shop.findByPk(shopId);
        if(!shop) {
            throw Error('Invalid shop id provided')
        }

        const employee = await Employee.findByPk(employeeId);
        if(!employee) {
            throw Error('Invalid employee id provided.')
        }
        const attendances = await Attendance.findAll({where: {EmployeeId: employeeId}, order: [ [ 'createdAt', 'DESC' ]]});
        const clockInExists = attendances.length && attendances[0];
        if(clockInExists && !clockInExists.clockOutTime) {
            throw Error('Clock out first.')
        }
        const attendance = await Attendance.create({
            id: uuidv4(),
            clockInTime: time
        });
        await shop.addAttendance(attendance);
        await employee.addAttendance(attendance);
        return attendance;
    }

    static async getAttendanceReports({shopId, startDate, endDate}) {
        if(!shopId) throw Error('Shop id required.')
        const shop = await Shop.findByPk(shopId);
        if(!shop) throw Error('Invalid shop id required.')
        startDate += 'T00:00:00.000Z'
        endDate += 'T23:59:59.000Z'
        return await Attendance.findAll({where: {ShopId: shopId,
                    [Op.or]: [{clockInTime: {[Op.between]: [startDate, endDate]}}, {clockOutTime: {[Op.between]: [startDate, endDate]}},
                        { [Op.and]: [{clockInTime: {[Op.lte]: startDate}}, {clockOutTime: {[Op.gte]: endDate}} ] }] } , include: [Employee]});
    }

    static async updateAttendance(attendanceParams) {
        const {employeeId, time} = attendanceParams;
        const attendances = await Attendance.findAll({where: {EmployeeId: employeeId}, order: [ [ 'createdAt', 'DESC' ]]});
        const attendance = attendances[0];
        if(!attendance) {
            throw Error('No clock in found.')
        }
        attendance.clockOutTime = time;
        await attendance.save();
        return attendance;
    }
}

module.exports = AttendanceService;
