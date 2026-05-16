const {Route} = require('express');
const router = Route();
const commentController = require('../controllers/comment.controllers');

router.get('/', commentController.obtainComments);
router.get('/ususario/:id',verificarUsuario,comment.Controller.getComentariosDeUsuario) //Get todos los comentarios de un usuario
router.post('/usuario/:idUsuario/:idDelPost', verificarUsuario,VerificarPost, verificarComentarioJOI,commentController.createComment); //Crear un comentario de :idUsuario en :idPost
router.put('/:id',verificarUsuario, verificarComentario,VerificarPot, commentController.editComment)  //Tendriamos que "bloquear" el que se pueda cambiar el usuario que creo el comentario 
router.delete('/:id', commentController.deleteComment);
    
module.exports = router;