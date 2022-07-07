const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const collectionRouter = require('./collectionRouter');
const commentRouter = require('./commentRouter');
const subjectRouter = require('./subjectRouter');
const itemRouter = require('./itemRouter');
const addFieldRouter = require('./addFieldRouter');
const tagRouter = require('./tagRouter');
const typeRouter = require('./typeRouter');
const likeRouter = require('./likeRouter');


router.use('/user', userRouter);
router.use('/collection', collectionRouter);
router.use('/comment', commentRouter);
router.use('/subject', subjectRouter);
router.use('/item', itemRouter);
router.use('/add_field', addFieldRouter);
router.use('/tag', tagRouter);
router.use('/like', likeRouter);



module.exports = router