const express = require('express');
const {
    getTask,
    createTask,
    deleteTask,
    updateTask,
    postTask
} = require('../controllers/task-controller');

const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/task-manager', requireAuth, getTask);
router.get('/create-task', requireAuth, createTask);
router.get('/task-manager/delete/:id', requireAuth, deleteTask);
router.get('/task-manager/update/:id', requireAuth, updateTask);
router.post('/create-task', requireAuth, postTask);




module.exports = router;