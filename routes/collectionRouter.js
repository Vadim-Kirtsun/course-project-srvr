const Router = require('express');
const router = new Router();
const CollectionController = require('../controllers/CollectionController');

router.post('/', CollectionController.create);
router.get('/', CollectionController.getAll);
router.get('/:id', CollectionController.getOne);
router.delete('/', CollectionController.delete);




module.exports = router