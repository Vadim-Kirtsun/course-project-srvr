const Router = require('express');
const router = new Router();
const  ItemController = require('../controllers/ItemController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, ItemController.create);
router.get('/', ItemController.getAll);
router.get('/latest', ItemController.getLatest);
router.get('/:id', ItemController.getOne);
router.delete('/:id', authMiddleware, ItemController.delete);




module.exports = router