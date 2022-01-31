const express = require('express');
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

router.get('/cafedras/:id', getCafedra);
router.delete('/cafedras/:id', deleteCafedra);
router.get('/edit/:id', getEditCafedra);
router.put('/edit/:id', editCafedra);
router.get('/cafedras', getCafedras);
router.post('/add-cafedra', getAddCafedra);
router.get('/add-cafedra', AddCefedra);

module.exports = router;