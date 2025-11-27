//We don't have our mongo collections yet

//require statements go up here
const mongodb = require('../data/database');
const objectId = require("mongodb").ObjectId;

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
    
    // Will be updated with actual fields
    const categoryUpdates = req.body;

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

module.exports = { deleteCategory, updateCategory };
