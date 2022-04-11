const express = require('express');
const {
   getProfile,
   postProfile
} = require('../controllers/profile-controller');

const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', requireAuth, getProfile);
router.post('/profile', requireAuth, postProfile);

module.exports = router;