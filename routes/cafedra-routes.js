const express = require('express');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const { 
    getCafedra,
    deleteCafedra,
    getEditCafedra,
    editCafedra,
    getCafedras,
    getAddCafedra,
    AddCefedra
} = require('../controllers/cafedra-controller');

const router = express.Router();

router.get('/cafedras/:id', requireAuth, getCafedra);
router.delete('/cafedras/:id', requireAuth, deleteCafedra);
router.get('/edit/:id', requireAuth, getEditCafedra);
router.put('/edit/:id', requireAuth, editCafedra);
router.get('/cafedras', getCafedras);
router.post('/add-cafedra', getAddCafedra);
router.get('/add-cafedra', requireAuth, AddCefedra);

module.exports = router;