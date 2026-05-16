const {Route} = require('express');
const router = Route();
const imageController = require('../controllers/image.controllers');

router.get('/', imageController.obtainImages);  

module.exports = router;