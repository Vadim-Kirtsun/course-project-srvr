const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const collectionRouter = require('./collectionRouter');
const commentRouter = require('./commentRouter');
const subjectRouter = require('./subjectRouter');
const itemRouter = require('./itemRouter');
const addFieldSetRouter = require('./addFieldSetRouter');
const addFieldRouter = require('./addFieldRouter');
const tagRouter = require('./tagRouter');
const typeRouter = require('./typeRouter');


router.use('/user', userRouter);
router.use('/collection', collectionRouter);
router.use('/comment', commentRouter);
router.use('/subject', subjectRouter);
router.use('/item', itemRouter);
router.use('/add_field_set', addFieldSetRouter);
router.use('/add_field', addFieldRouter);
router.use('/tag', tagRouter);
router.use('/type', typeRouter);



module.exports = router