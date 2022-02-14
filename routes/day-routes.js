const express = require('express');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const { 
    getPrepod,
  //  deleteCafedra,
  //  getEditCafedra,
  //  editCafedra,
    getPrepods,
  //  getAddCafedra,
  //  AddCefedra
} = require('../controllers/prepod-controller');

const router = express.Router();

router.get('/prepods/:id/', requireAuth, getPrepod);
//router.delete('/cafedras/:id', requireAuth, deleteCafedra);
//router.get('/edit/:id', requireAuth, getEditCafedra);
//router.put('/edit/:id', requireAuth, editCafedra);
router.get('/prepods', getPrepods);
//router.post('/add-cafedra', getAddCafedra);
//router.get('/add-cafedra', requireAuth, AddCefedra);

module.exports = router;