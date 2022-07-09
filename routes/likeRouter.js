const Router = require('express');
const router = new Router();
const  LikeController = require('../controllers/LikeController');

router.put('/', LikeController.updateLike);

module.exports = router