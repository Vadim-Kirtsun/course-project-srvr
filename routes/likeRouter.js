const Router = require('express');
const router = new Router();
const  LikeController = require('../controllers/LikeController');

router.post('/', LikeController.createLike);

module.exports = router