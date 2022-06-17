const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/TagController')


router.get('/', TypeController.getAll);


module.exports = router