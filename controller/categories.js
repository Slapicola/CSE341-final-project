//We don't have our mongo collections yet

//require statements go up here
const mongodb = require('../data/database');
const objectId = require("mongodb").ObjectId;


// --- GET ALL CATEGORIES ---
const getAllCategories = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db();
    const categories = await db.collection("categories").find().toArray();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// --- GET CATEGORY BY ID ---
const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!objectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const db = mongodb.getDatabase().db();
    const category = await db
      .collection("categories")
      .findOne({ _id: new objectId(id) });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

//Create function for categories
const createCategory = async(req, res) => {
  try {
      const category = {
      //Category fields 
      CategoryName: req.body.CategoryName,
      description: req.body.description,
      createdAt: new Date()
    }
    const response = await mongodb.getDatabase().db().collection('categories').insertOne(category);
    if (response.acknowledged) {
          res.status(201).json({ 
    message: "Category created successfully",
    productId: response.insertedId
  });

    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the category.');
    } 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Delete function for category collection
const deleteCategory = async (req, res) => {
  try {
    const categoryId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase() //getDatabase and db need to be set up as well, the names can be changed if needs be
      .db()
      .collection() //Still need the collections set up
      .deleteOne({ _id: categoryId });
    if (response.deleteCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleteing the category."
        );
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = new objectId(req.params.id);
    
    const categoryUpdates = {
      CategoryName: req.body.CategoryName,
      description: req.body.description,
    }

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('categories')
      .updateOne({ _id: categoryId }, { $set: categoryUpdates });
    
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(200).json({ message: 'No changes made to category' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { deleteCategory, createCategory, updateCategory, getAllCategories, getCategoryById };
