const { ObjectId } = require('mongodb');
const db = require('../db/conn');

const collection = () => db.getDb().collection('categories');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await collection().find().toArray();
    res.json(categories);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await collection().findOne({ _id: new ObjectId(req.params.id) });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name is required' });

  try {
    const result = await collection().insertOne({ name });
    res.status(201).json(result);
  } catch {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name is required' });

  try {
    const result = await collection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name } }
    );
    res.json(result);
  } catch {
    res.status(400).json({ error: 'Update failed or invalid ID' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await collection().deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch {
    res.status(400).json({ error: 'Delete failed or invalid ID' });
  }
};
