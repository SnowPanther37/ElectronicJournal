const express = require('express');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const { 
    getUser,
    getUsers,
    getEditUser,
    editUser,
    deleteUser,
} = require('../controllers/users-controller');

const router = express.Router();

router.get('/users/:id/', requireAuth, getUser);
router.delete('/users/:id', requireAuth, deleteUser);
//router.get('/edit/:id', requireAuth, getEditCafedra);
//router.put('/edit/:id', requireAuth, editCafedra);
router.get('/users', requireAuth, getUsers);
router.get('/edit-user/:id', requireAuth, getEditUser);
router.put('/edit-user/:id', requireAuth, editUser);
//router.post('/add-cafedra', getAddCafedra);
//router.get('/add-cafedra', requireAuth, AddCefedra);

module.exports = router;