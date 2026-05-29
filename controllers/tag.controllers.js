const { tag } = require("../models");

const createTag = async(req, res) => {
    try {
        const newTag = await tag.create(req.body);
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ message: "Error al crear la etiqueta", error: error.message });
    }
};

const getAllTags =async(req, res) => {
    try {
        const tags = await tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las etiquetas", error: error.message });
    }
};

module.exports = { createTag, getAllTags}