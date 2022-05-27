const express = require('express');
const AttendanceService = require("../../../services/AttendanceService");
const attendanceRouter = express.Router();

const authorizeMiddleware = require('./../../../middlewares/authorize.middleware.js');

attendanceRouter.use(authorizeMiddleware.protect);

attendanceRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const attendance = await AttendanceService.addClockIn(body)
        res.status(200).send(attendance);
    } catch (e) {
        const message = e.message || 'Error occurred while creating attendance.'
        res.status(400).send({message})
    }
});

attendanceRouter.get('/:shopId', async (req, res) => {
    try {
        if(!req.params.shopId){
            return res.status(404).send({message: 'Shop Id is require to perform this action.'});
        }
        if(!req.query.startDate){
            return res.status(404).send({message: 'Start Date is require to perform this action.'});
        }
        if(!req.query.endDate){
            return res.status(404).send({message: 'End Date is require to perform this action.'});
        }
        const attendance = await AttendanceService.getAttendanceReports({
            shopId: req.params.shopId,
            startDate: req.query.startDate,
            endDate: req.query.endDate
        });
        res.status(200).send(attendance);
    } catch (e) {
        const message = e.message || 'Error occurred fetching attendance reports.'
        res.status(400).send({message: message})
    }
});

attendanceRouter.put('/', async (req, res) => {
    try {
        const body = req.body;
        const attendance = await AttendanceService.updateAttendance(body)
        res.status(200).send(attendance);
    } catch (e) {
        const message = e.message || 'Error occurred while clocking out.'
        res.status(400).send({message: message})
    }
});

module.exports = attendanceRouter;
