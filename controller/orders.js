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

const updateOrder = async (req, res) => {
  try {
    const orderId = new objectId(req.params.id);
    const orderUpdates = {
      user: req.body.user,
      products: req.body.products,
      totalProductAmount: req.body.totalProductAmount,
      totalPrice: req.body.totalPrice
    };

    Object.keys(orderUpdates).forEach(key => {
      orderUpdates[key] === undefined && delete orderUpdates[key];
    });

    if (Object.keys(orderUpdates).length === 0) {
      return res.status(400).json({ message: 'No data provided for update' });
    }
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("orders")
      .updateOne({ _id: orderId }, { $set: orderUpdates });
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(200).json({ message: 'No changes made to the order' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { deleteOrder, updateOrder };
