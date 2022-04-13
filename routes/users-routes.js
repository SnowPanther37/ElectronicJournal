const express = require('express');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const { 
    getUser,
    getUsers,
    getEditUser,
    editUser,
    deleteUser,
    //getAddUser,
    postUser,
} = require('../controllers/users-controller');

const router = express.Router();

router.get('/users/:page/:id/', requireAuth, getUser);
router.delete('/users/:id', requireAuth, deleteUser);
//router.get('/edit/:id', requireAuth, getEditCafedra);
//router.put('/edit/:id', requireAuth, editCafedra);
router.get('/users/:page', requireAuth, getUsers);
router.get('/edit-user/:id', requireAuth, getEditUser);
router.put('/edit-user/:id', requireAuth, editUser);
//router.post('/add-user', getAddUser);
router.post('/user', requireAuth, postUser);
//router.get('/add-cafedra', requireAuth, AddCefedra);

module.exports = router;