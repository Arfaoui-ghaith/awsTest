'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Attendance.belongsTo(models.Employee, {
                foreignKey: 'EmployeeId',
                onDelete: 'CASCADE'
            })
            Attendance.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
        }
    }
    Attendance.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        clockInTime: DataTypes.DATE,
        clockOutTime: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Attendance',
    });
    return Attendance;
};
