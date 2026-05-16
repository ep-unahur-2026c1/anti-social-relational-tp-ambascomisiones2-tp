'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post_Image.belongsTo(models.post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  }
  post_Image.init({
    imagineUrl: DataTypes.STRING, //Error Tipeo
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post_Image',
  });
  return post_Image;
};