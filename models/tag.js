'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tag.belongsToMany(models.post, {
        through: 'post_tags',
        foreignKey: 'tagId',
        otherKey: 'postId',
        as: 'posts',
      });
    }
  }
  tag.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    sequelize,
    modelName: 'tag',
  });
  return tag;
};