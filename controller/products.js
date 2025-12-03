//We don't have our mongo collections yet
//Mongo collections added - Emmanuel
const mongodb = require("../data/database");

//require statements go up here
const objectId = require("mongodb").ObjectId;

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching products",
      error: err,
    });
  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const productId = new objectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .findOne({ _id: productId });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    });
  }
};

//Delete function for products collection
const deleteProduct = async (req, res) => {
  try {
    const productId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase() //getDatabase and db have already been added to the mongoDB URI
      .db()
      .collection("products") //Products collections
      .deleteOne({ _id: productId });
    if (response.deletedCount > 0) {
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
    //Product fields 

    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    createdAt: new Date()
  }
  const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
  if (response.acknowledged) {
        res.status(201).json({ 
  message: "Product created successfully",
  productId: response.insertedId
});

    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the product."
        );
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = new objectId(req.params.id);

    const productUpdates = {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .updateOne({ _id: productId }, { $set: productUpdates });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(200).json({ message: "No changes made to product" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  deleteProduct,
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
};
