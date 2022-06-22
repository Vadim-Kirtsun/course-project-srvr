const Router = require('express');
const router = new Router();
const AddFieldSetController = require('../controllers/AddFieldSetController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create',authMiddleware, AddFieldSetController.create);
router.get('/', AddFieldSetController.getAll);
router.delete('/', AddFieldSetController.delete);




module.exports = router