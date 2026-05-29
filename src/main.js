const express = require('express');
require('dotenv').config();
const app = express();
const db = require('../models');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const port = process.env.PORT || 3000;
const path = require('path');

const cache = require('../config/redisClient')

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

//Rutas
app.use('/users', require('../routes/user.routes'));
app.use('/posts', require('../routes/post.routes'));
app.use('/comments', require('../routes/comment.routes'));
app.use('/tags', require('../routes/tag.routes'));
app.use('/post_images', require('../routes/post_image.routes'));

app.listen(port, async () => {
    try {
    await db.sequelize.sync();
    console.log(`Base de datos activa: ${db.sequelize.getDialect()}`);
    console.log(`Servidor corriendo en http://localhost:${port}`);
    } catch (error) {
        console.error('Error al sincronizar la base de datos:',error);
    } 
    try {
        await cache.connect()
        console.log(`Conectado a redis`)
    } catch (error) {
        console.error('Error al concectar en redis',error)
    }
});

