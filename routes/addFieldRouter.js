const Router = require('express');
const router = new Router();
const AddFieldController = require('../controllers/AddFieldController')

router.post('/', AddFieldController.create);
router.get('/', AddFieldController.getAll);
router.delete('/', AddFieldController.delete);




module.exports = router