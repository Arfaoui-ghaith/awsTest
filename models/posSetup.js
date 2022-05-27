'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PosSetup extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            PosSetup.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            });
        }
    }
    PosSetup.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        currency: DataTypes.STRING,
        logo: DataTypes.TEXT,
        image: DataTypes.TEXT,
        timeFormat: DataTypes.STRING,
        enableScanner: DataTypes.BOOLEAN,
        StoreId: DataTypes.UUID,
        billSeries: DataTypes.TEXT,
        ipAddress: DataTypes.STRING,
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
        modelName: 'PosSetup',
    });
    return PosSetup;
};
