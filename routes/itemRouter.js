const Router = require('express');
const router = new Router();
const  ItemController = require('../controllers/ItemController')

router.post('/', ItemController.create);
router.get('/', ItemController.getAll);
router.get('/:id', ItemController.getOne);
router.delete('/', ItemController.delete);




module.exports = router