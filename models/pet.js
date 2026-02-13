'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Pet.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'uzer_id'
            })
        }
    }
    Pet.init({
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        name: DataTypes.STRING,
        uzer_id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Pet',
        timestamps: false,
        tableName: 'pet'
    });
    return Pet;
};