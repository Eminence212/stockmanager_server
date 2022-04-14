const router = require('express').Router();
const commandCtrl = require('../controllers/commandCtrl');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.post('/add', auth, commandCtrl.register);
router.get('/:id', auth, commandCtrl.getById);
router.get('/', auth, commandCtrl.getAll);
router.patch('/update/:id', auth, authAdmin, commandCtrl.update);
router.delete('/delete/:id', auth, authAdmin, commandCtrl.delete);

module.exports = router;
