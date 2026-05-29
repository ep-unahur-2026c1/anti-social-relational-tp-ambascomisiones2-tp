const { where, Association } = require("sequelize");
const { user, post, comment, post_image } = require("../models");

const createUser = async (req, res) => {
  try {
    const newUser = await user.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

const getUserByNickName = async (req, res) => {
  try {
    const { nickName } = req.params;
    
    const profile = await user.findOne({
      where: { nickName },
      include: [
        {
          model: user, 
          as: "Following", 
          attributes: ["nickName", "firstName", "lastName"],
          through: { attributes: [] } 
        },
        {
          model: user, // 
          as: "FollowedBy", 
          attributes: ["nickName", "firstName", "lastName"],
          through: { attributes: [] } 
        }
      ]
    });
    
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil del usuario", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const foundUser = req.foundUser;
    const updatedUser = await foundUser.update(req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el usuario",
        error: error.message,
      });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { nickName } = req.params;
    const foundUser = req.foundUser;

    const userPosts = await post.findAll({ where: { nickName } });
    const postIds = userPosts.map((p) => p.id);

    await comment.destroy({ where: { nickName } });
    if (postIds.length > 0) {
      await comment.destroy({ where: { postId: postIds } });
      await post_image.destroy({ where: { postId: postIds } });
      await post.destroy({ where: { nickName } });
    }
    await foundUser.destroy();

    res
      .status(200)
      .json({ message: "Usuario y todo su contenido asociado eliminados" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const { followerNick, targetNick } = req.body;
    if (followerNick === targetNick) {
      return res.status(400).json({ error: "No podés seguirte a vos mismo" });
    }
    const follower = await user.findByPk(followerNick);
    const target = await user.findByPk(targetNick);

    if (!follower || !target) {
      return res
        .status(404)
        .json({ error: "El usuario seguidor o el objetivo no existe" });
    }

    await follower.addFollowing(target);
    return res
      .status(200)
      .json({
        message: `¡Éxito! @${followerNick} ahora sigue a @${targetNick}`,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al procesar el seguimiento",
        error: error.message,
      });
  }
};

module.exports = {
  createUser,
  getUserByNickName,
  getAllUsers,
  updateUser,
  deleteUser,
  followUser,
};
