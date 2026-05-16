const {Route} = require('express');
const router = Route();
const tagController = require('../controllers/tag.controllers');    

router.get('/', tagController.obtainUser);
router.post('/', tagController.createUser);
router.delete('/:id', tagController.deleteUser);

module.exports = router;
