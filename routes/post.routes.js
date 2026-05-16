const {Route} = require('express');
const router = Route();
const postController = require('../controllers/post.controllers');

router.get('/', postController.obtainPosts);    //Obtener todos los posts
router.get('/:id', postController.obtainPostById);  //Obtener un post en particular
router.post('/:idUsuario', verificarTags,verificarPost,verificarUsuario,postController.createPost); //Deberiamos tener la opcion de ya crear el post con el tag
//                ⬆️⬆️ Aca tambien deberia ir el middleWare de MULTER para poder subir imagenes y no solo el link
router.put('/:id', postController.updatePost); //Desde el PUT podemos manejar la asociacion y des-asociacion de Tags
                /*⬆️⬆️ Aca tambien deberia ir el middleWare de MULTER para poder subir imagenes y no solo el link*/ 
router.delete('/:id', postController.deletePost);

module.exports = router;