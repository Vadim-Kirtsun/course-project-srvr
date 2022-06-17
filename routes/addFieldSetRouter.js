const Router = require('express');
const router = new Router();
const AddFieldSetController = require('../controllers/AddFieldSetController')

router.post('/', AddFieldSetController.create);
router.get('/', AddFieldSetController.getAll);
router.delete('/', AddFieldSetController.delete);




module.exports = router