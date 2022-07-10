const Router = require('express');
const router = new Router();
const TagController = require('../controllers/TagController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, TagController.create);
router.get('/', TagController.getAll);
router.get('/withItems', TagController.getTagsWithItemCount);
router.delete('/', TagController.delete);




module.exports = router