const Router = require('express');
const router = new Router();
const AddFieldController = require('../controllers/AddFieldController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, AddFieldController.create
);
router.get('/getFields', AddFieldController.getAll);
router.put('/delete', AddFieldController.delete);

module.exports = router