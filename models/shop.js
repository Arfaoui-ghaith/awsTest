'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Shop extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Shop.hasMany(models.Employee, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Role, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Material, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Store, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Printer, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Table, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Unit, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.BillTemplate, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            // TODO should be hasOne
            Shop.hasOne(models.PosSetup, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.ExpenseCategory, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Expense, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.MenuItemCategory, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.MenuItem, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Stock, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.StockLog, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Session, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Bill, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Attendance, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Customer, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.EmailConfig, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Shop.belongsTo(models.Company, {
                foreignKey: 'CompanyId',
                onDelete: 'CASCADE'
            })
            Shop.belongsTo(models.Country, {
                foreignKey: 'CountryId',
                onDelete: 'CASCADE'
            })
            Shop.hasMany(models.Bill_Item, {
                foreignKey: 'shopId',
                onDelete: 'CASCADE'
            })
        }
    }
    Shop.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        CompanyId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        CountryId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isDeletable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }, {
        sequelize,
        modelName: 'Shop',
    });

    Shop.beforeCreate( async (shop) => {
        let company = await sequelize.models.Company.findByPk(shop.CompanyId);
        if(!company){ throw Error("No companies found with the company id given.") }
        if(company.maxShops){
            let nbrShops = await sequelize.models.Shop.count({ where: { CompanyId: shop.CompanyId } });
            if(nbrShops >= company.maxShops){
                throw Error("You can't create more than "+company.maxShops);
            }
        }
    });
    return Shop;
};
