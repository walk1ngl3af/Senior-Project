'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sightings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sightings.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'uzer_id'
      })
    }
  }
  Sightings.init({
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    uzer_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sightings',
    timestamps: false,
    tableName: 'sightings'
  });
  return Sightings;
};