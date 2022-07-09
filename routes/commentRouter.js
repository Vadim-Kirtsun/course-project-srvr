const Router = require('express');
const router = new Router();
const CommentController = require('../controllers/CommentController')

router.post('/create', CommentController.create);
router.get('/', CommentController.getAll);
router.delete('/', CommentController.delete);




module.exports = router