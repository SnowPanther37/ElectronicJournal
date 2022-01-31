const express = require('express');
const { 
    getCafedra,
    deleteCafedra,
    editCafedra,
    getCafedras,
    getAddCafedra,
} = require('../controllers/api-cafedra-controller');

const router = express.Router();

// Get All Cafedras
router.get('/api/cafedras', getCafedras);
// Add New Cafedra
router.post('/api/add-cafedra', getAddCafedra);
// Get Cafedra by ID
router.get('/api/cafedra/:id', getCafedra);
// Delete Cafedra by ID
router.delete('/api/cafedra/:id', deleteCafedra);
// Update Cafedra by ID
router.put('/api/cafedra/:id', editCafedra);

module.exports = router;