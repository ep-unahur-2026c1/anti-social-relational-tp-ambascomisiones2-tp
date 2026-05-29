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
        foreignKey: "nickName",
        as: "user",
      });
      comment.belongsTo(models.post, {
        foreignKey: "postId",
        as: "post",
      });
    }
  }
  comment.init({
    text: { type: DataTypes.STRING, allowNull: false },
    createDate: { type: DataTypes.DATE, allowNull: false },
    visible: { type: DataTypes.BOOLEAN, allowNull: false },
    nickName: { type: DataTypes.STRING, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};