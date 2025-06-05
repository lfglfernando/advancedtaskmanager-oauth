const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const ensureAuth = require('../middleware/ensureAuth');

router.get('/', ensureAuth, controller.getAllTasks);

router.get('/:id', ensureAuth, controller.getTaskById);

router.post('/', ensureAuth, controller.createTask);

router.put('/:id', ensureAuth, controller.updateTask);

router.delete('/:id', ensureAuth, controller.deleteTask);

module.exports = router;
