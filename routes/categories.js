const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');
const ensureAuth = require('../middleware/ensureAuth');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 */
router.get('/', ensureAuth, controller.getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.get('/:id', ensureAuth, controller.getCategoryById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 */
router.post('/', ensureAuth, controller.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', ensureAuth, controller.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', ensureAuth, controller.deleteCategory);

module.exports = router;
