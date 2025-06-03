// routes/tasks.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const ensureAuth = require('../middleware/ensureAuth');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized (not logged in)
 *       500:
 *         description: Server error
 */
router.get('/', ensureAuth, controller.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized (not logged in)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get('/:id', ensureAuth, controller.getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - priority
 *               - completed
 *               - categoryId
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Detailed description of the task
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Due date in ISO 8601 format, e.g., "2025-06-10T00:00:00Z"
 *               priority:
 *                 type: string
 *                 description: Priority level (e.g., "High", "Medium", "Low")
 *               completed:
 *                 type: boolean
 *                 description: Completion status of the task
 *               categoryId:
 *                 type: string
 *                 description: ObjectId of the category this task belongs to
 *               userId:
 *                 type: string
 *                 description: Identifier of the user who owns the task
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: Unauthorized (not logged in)
 *       500:
 *         description: Server error
 */
router.post('/', ensureAuth, controller.createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - priority
 *               - completed
 *               - categoryId
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the task
 *               description:
 *                 type: string
 *                 description: Updated detailed description
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated due date in ISO format
 *               priority:
 *                 type: string
 *                 description: Updated priority level
 *               completed:
 *                 type: boolean
 *                 description: Updated completion status
 *               categoryId:
 *                 type: string
 *                 description: Updated category ObjectId
 *               userId:
 *                 type: string
 *                 description: Updated user identifier
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Missing or invalid fields / Invalid ID
 *       401:
 *         description: Unauthorized (not logged in)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put('/:id', ensureAuth, controller.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized (not logged in)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', ensureAuth, controller.deleteTask);

module.exports = router;
