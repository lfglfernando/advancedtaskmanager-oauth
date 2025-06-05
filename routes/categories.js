const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');
const ensureAuth = require('../middleware/ensureAuth');

router.get('/', ensureAuth, controller.getAllCategories);

router.get('/:id', ensureAuth, controller.getCategoryById);

router.post('/', ensureAuth, controller.createCategory);

router.put('/:id', ensureAuth, controller.updateCategory);

router.delete('/:id', ensureAuth, controller.deleteCategory);

module.exports = router;
