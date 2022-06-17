const Router = require('express');
const router = new Router();
const TagController = require('../controllers/TagController')

router.post('/', TagController.create);
router.get('/', TagController.getAll);
router.delete('/', TagController.delete);




module.exports = router