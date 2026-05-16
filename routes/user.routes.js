const {Router} = require('express');
const router = Router();
const userController = require('../controllers/user.controller');
const validarUserJoi = require('../middlewares/validarUserJoi')
const verificarNickName = require('../middlewares/verificarNickName')


router.get('/', userController.obtainUsers); //Obtener todos los usuarios
router.get('/:id', userController.obtainUserById);  //Obtener un usuario en especial
router.get('/posts/:id',userController.obtainsPosts)  //Que devuelva los post de un usuario en especial. Podria estar bueno
router.get('/comments/:id',userController.obtainsComments) //Que devuelva los comentarios de un usuario en especial. Podria estar bueno*/ 
router.post('/', validarUserJoi, verificarNickName, userController.createUser);    //Crear un usuario
router.put('/:id', validarUserExistente,validarUserJoi,verificarNickName, userController.updateUser); //Editar un Usuario
router.delete('/:id', userController.deleteUser);   //Eliminar un usuario

module.exports = router;