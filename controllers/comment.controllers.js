const {comment} = require("../models");

const createComment = async (req, res) => {
    try {
        const newComment = await comment.create(req.body);
        res.status(201).json(newComment);
    }catch (error){
        res.status(400).json({ message: "Error al crear el comentario", error: error.message });
    }
};

const deleteComment = async(req, res) => {
    try {
        const foundComment = req.foundComment;
        await foundComment.destroy();

        return res.status(200).json({message: "Commentario eliminado con éxito"});
    }catch (error){
        res.status(500).json({ message: "Error al eliminar el comentario", error: error.message });
    } 
};

module.exports = {createComment, deleteComment};