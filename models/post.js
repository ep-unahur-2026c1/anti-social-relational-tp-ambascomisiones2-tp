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
        foreignKey: 'userID',
        as: 'user'
      });

      post.belongsToMany(models.tag, {
        through: 'post_tags',
        foreignKey: 'postId',
        otherKey: 'tagId',
        as: 'tags'
      });

      post.hasMany(models.comment, {
        foreignKey: 'postId',
        as: 'comments'
      });
      
      post.hasMany(models.post_Image, {
        foreignKey: 'postId',
        as: 'images'
      });
    }
  }
  post.init({
    description: DataTypes.STRING,
    createDate: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};