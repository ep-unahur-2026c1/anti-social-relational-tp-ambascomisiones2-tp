"use strict";
const { Model } = require("sequelize");
const calcularEdad = (fechaNacimiento) =>{
  const cumpleaños = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - cumpleaños.getFullYear();
  const mes = hoy.getMonth() - cumpleaños.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleaños.getDate())){
    edad--;
  }
  return edad;
}
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.post, {
        foreignKey: "nickName",
        as: "posts",
      });
      user.hasMany(models.comment, {
        foreignKey: "nickName",
        as: "comments",
      });
      // Usuarios que sigo
      user.belongsToMany(models.user,{
        through: "Followers",
        as: "Following",
        foreignKey: "follower_id",
        otherKey: "following_id"
      });
      // Usuarios que me siguen
      user.belongsToMany(models.user, {
        through: "Followers",
        as: "FollowedBy",
        foreignKey: "following_id",
        otherKey: "follower_id"
      });

    }
  }
  user.init(
    {
      nickName: { type: DataTypes.STRING, allowNull: false, unique: true,primaryKey:true },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      birthdate: { type: DataTypes.DATE, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "user",
      hooks: {
        beforeValidate: (usuario) => {
          if (usuario.birthdate){
            usuario.age = calcularEdad(usuario.birthdate);
          }
        }
      }
    },
  );
  return user;
};
