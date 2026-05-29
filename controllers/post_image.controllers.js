const { post_image } = require("../models");
const fs = require('fs');
const path = require('path');

const createImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se subió ninguna imagen." });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const newImage = await post_image.create({
            postId: req.body.postId,
            imageUrl: imageUrl
        });

        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: "Error al subir la imagen.", error: error.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        const foundImage = req.foundImage;
        
        const filename = path.basename(foundImage.imageUrl);
        const filePath = path.join(__dirname, '..', 'public', 'uploads', filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await foundImage.destroy();
        res.status(200).json({ message: "Imagen eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la imagen.", error: error.message });
    }
};

module.exports = {
    createImage,
    deleteImage
};