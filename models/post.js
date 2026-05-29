'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.user, {
        foreignKey: "nickName",
        as: "user",
      });
      post.hasMany(models.comment, {
        foreignKey: "postId",
        as: "comments",
      });
      post.belongsToMany(models.tag, {
        through: 'post_tags',
        foreignKey: 'postId',
        otherKey: 'tagId',
        as: 'tags',
      });
      post.hasMany(models.post_image, {
        foreignKey: "postId",
        as: "images",
      });
      
    }
  }
  post.init({
    description: { type: DataTypes.STRING, allowNull: false },
    createDate: { type: DataTypes.DATE, allowNull: false },
    nickName: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};