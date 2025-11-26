//We don't have our mongo collections yet

//require statements go up here
const objectId = require("mongodb").ObjectId;

//Delete function for products collection
const deleteProduct = async (req, res) => {
  try {
    const productId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase() //getDatabase and db need to be set up as well, the names can be changed if needs be
      .db()
      .collection() //Still need the collections set up
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

module.exports = { deleteProduct };
