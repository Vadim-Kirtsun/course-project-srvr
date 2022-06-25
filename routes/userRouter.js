const Router = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', authMiddleware, UserController.check);
router.get('/getUsers', authMiddleware, UserController.getUsers);
router.put('/blockUser', UserController.blockUser);
router.put('/unblockUser', UserController.unblockUser);
router.put('/deleteUser', UserController.deleteUser);
router.put('/changeRole', UserController.changeRole);


module.exports = router;