'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post_image.belongsTo(models.post, {
        foreignKey: "postId",
        as: "post",
      });
    }
  }
  post_image.init({
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'post_image',
  });
  return post_image;
};