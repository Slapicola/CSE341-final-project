//We don't have our mongo collections yet
//Mongo collections added - Emmanuel
const mongodb = require('../data/database');

//require statements go up here
const objectId = require("mongodb").ObjectId;

//Delete function for products collection
const deleteProduct = async (req, res) => {
  try {
    const productId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase() //getDatabase and db have already been added to the mongoDB URI
      .db()
      .collection(products) //Products collections
      .deleteOne({ _id: productId });
    if (response.deleteCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleteing the product."
        );
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = {
    //Product's fields not yet decided

    productName: req.body.productName
  }
  const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
  if (response.acknowledged > 0) {
        res.status(201).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the product.');
    } 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { deleteProduct, createProduct };
