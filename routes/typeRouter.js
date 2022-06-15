const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/TypeController')

router.post('/', TypeController.create);
router.get('/', TypeController.getAll);
router.delete('/', TypeController.delete);




module.exports = router