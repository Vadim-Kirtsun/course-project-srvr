const Router = require('express');
const router = new Router();
const SubjectController = require('../controllers/TagController')


router.get('/', SubjectController.getAll);


module.exports = router