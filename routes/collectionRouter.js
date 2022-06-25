const Router = require('express');
const router = new Router();
const CollectionController = require('../controllers/CollectionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, CollectionController.create);
router.get('/', CollectionController.getAll);
router.get('/:id', CollectionController.getOne);
router.put('/delete', CollectionController.delete);




module.exports = router;