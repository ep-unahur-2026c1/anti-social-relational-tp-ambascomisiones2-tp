const { Op } = require("sequelize");
const { post, comment, post_image,tag, user } = require("../models");
const { required } = require("joi");
const cache = require('../config/redisClient')

const createPost = async(req, res) => {
    try {
        const newPost = await post.create(req.body);
        res.status(201).json(newPost);
    } catch (error){
        res.status(400).json({ message: "Error al crear el post", error: error.message });
    }
};

const getCommentVisibilityCriterion = () => {
    const monthsLimit = parseInt(process.env.COMMENT_VISIBLE_MONTHS) || 6;
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsLimit);
    return{
        createDate: { [Op.gte]: cutoffDate },
        visible:true
    };
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await post.findAll({
            include:[
                {model: user, as: "user"},
                {model: post_image, as: "images"},
                {model: tag, as: "tags"},
                {model: comment,
                    as: "comments",
                    where: getCommentVisibilityCriterion(),
                    required: false
                }
            ]
        });
        res.status(200).json(posts);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener los posts", error: error.message });

    }
};

const getPostById = async(req, res) => {
    try {
        const {id} = req.params;
        const foundPost = await post.findByPk( id, {
            include:[
                {model: user, as: "user"},
                {model: post_image, as: "images"},
                {model: tag, as: "tags"},
                {model: comment,
                    as: "comments",
                    where: getCommentVisibilityCriterion(),
                    required: false
                }
            ]
        });
        await cache.set(`post:${id}`,JSON.stringify(foundPost),{EX:300})    //Si llego hasta aca es porque nolo encontro en la cache, lo setea con el nombre post + id del post, lo stringuifea pq redis funciona con strings y lo guarda x 5min nomas (300seg)
        console.log("Seteo en redis")
        res.status(200).json(foundPost);
        } catch (error){
            res.status(500).json({ message: "Error al obtener el post", error: error.message });
        }
};

const associateTagToPost = async (req, res) => {
  try {
    const { id } = req.params; 
    const foundPost = req.foundPost;
    const { tagId } = req.body;

    const foundTag = await tag.findByPk(tagId);
    if (!foundTag) {
      return res.status(404).json({ error: "Tag no encontrado" });
    }

    await foundPost.addTag(foundTag);

    return res.status(201).json({ message: "Etiqueta vinculada al post con éxito" });
  } catch (error) {
    return res.status(400).json({ message: "Error al vincular la etiqueta al post", error: error.message });
  }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const foundPost = req.foundPost;

        await comment.destroy({ where: { postId: id } });
        
        await post_image.destroy({ where: { postId: id } });
        
        await foundPost.setTags([]); 

        await foundPost.destroy();

        await cache.del(`post:${id}`) //Lo borro de redis tambien para que no quede en memoria

        return res.status(200).json({ message: "Post eliminado con éxito" });

    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el post", error: error.message });
    }        
};

module.exports = {createPost,getAllPosts,getPostById,associateTagToPost,deletePost};
