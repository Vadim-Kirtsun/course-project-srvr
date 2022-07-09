const Router = require('express');
const router = new Router();
const CollectionController = require('../controllers/CollectionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, CollectionController.create);
router.get('/', CollectionController.getAll);
router.get('/top5', CollectionController.getTop5);
router.get('/user/:id', CollectionController.getAllUser);
router.get('/:id', CollectionController.getOne);
router.delete('/:id', CollectionController.delete);




module.exports = router;