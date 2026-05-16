'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      user.hasMany(models.post, {
        foreignKey: 'userId',
        as: 'posts'
      });

      user.hasMany(models.comment, {
        foreignKey: 'userId',
        as: 'comments'
      });
    }
  }
  user.init({
    nickname: {
    type: DataTypes.STRING,
    primaryKey: true,    // Esto le dice a Sequelize que este es el ID
    allowNull: false,     // No puede ser nulo
    unique: true         // Aunque al ser primaryKey ya es único por definición
    },
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    age: DataTypes.INTEGER,   
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};