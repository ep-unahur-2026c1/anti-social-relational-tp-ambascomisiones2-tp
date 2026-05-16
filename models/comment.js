'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      });

      comment.belongsTo(models.post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  }
  comment.init({
    text: DataTypes.STRING,
    createDate: DataTypes.DATE,
    visible: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};