'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Employee.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            });
            Employee.belongsTo(models.Role, {
                foreignKey: 'RoleId',
                onDelete: 'CASCADE'
            });
            Employee.belongsTo(models.RoleCategory, {
                foreignKey: 'RoleCategoryId',
                onDelete: 'CASCADE'
            });
            Employee.hasMany(models.Attendance, {
                foreignKey: 'EmployeeId',
                onDelete: 'CASCADE'
            });
            Employee.hasMany(models.Bill, {
                foreignKey: 'EmployeeId',
                onDelete: 'CASCADE'
            });
            Employee.belongsTo(models.Company, {
                foreignKey: 'CompanyId',
                onDelete: 'CASCADE'
            });
        }
    }
    Employee.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        pin: DataTypes.STRING,
        registrationToken: DataTypes.UUID,
        RoleId: DataTypes.UUID,
        RoleCategoryId: DataTypes.UUID,
        CompanyId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        isDeletable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Employee',
    });

    Employee.beforeCreate( async (employee) => {
        if(employee.dataValues.CompanyId){
            let company = await sequelize.models.Company.findByPk(employee.dataValues.CompanyId);
            if(!company){ throw Error("No companies found with the company id given.") }
            if(company.maxEmployees){
                let nbrEmployees = await sequelize.models.Employee.count({ where: { CompanyId: company.id } });
                if(nbrEmployees >= company.maxEmployees){
                    throw Error("You can't create more than "+company.maxEmployees);
                }
            }
        }
    });
    return Employee;
};
