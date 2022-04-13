const express = require('express');
const {
    getTask,
    createTask,
    deleteTask,
    updateTask,
    updateTask2,
    postTask
} = require('../controllers/task-controller');

const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/task-manager', requireAuth, getTask);
router.get('/create-task', requireAuth, createTask);
router.get('/task-manager/delete/:id', requireAuth, deleteTask);
router.get('/task-manager/update/:id', requireAuth, updateTask);
router.get('/task-manager/update2/:id', requireAuth, updateTask2);
router.post('/create-task', requireAuth, postTask);




module.exports = router;