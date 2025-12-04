//require statements go up here
const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

//Delete function for orders collection
const deleteOrder = async (req, res) => {
  try {
    const orderId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("orders")
      .deleteOne({ _id: orderId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleteing the order."
        );
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { deleteOrder };
