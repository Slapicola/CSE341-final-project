//require statements go up here
const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;


// --- GET ALL ORDERS ---
const getAllOrders = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const orders = await db.collection("orders").find().toArray();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// --- GET ORDER BY ID ---
const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!objectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const db = mongodb.getDatabase();
    const order = await db
      .collection("orders")
      .findOne({ _id: new objectId(id) });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

//Delete function for orders collection
const deleteOrder = async (req, res) => {
  try {
    const orderId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase()
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

const createOrder = async (req, res) => {
  try {
    const order = {
      user: req.body.user,
      products: req.body.products,
      totalProductAmount: req.body.totalProductAmount,
      totalPrice: req.body.totalPrice
    };

    const response = await mongodb
      .getDatabase()
      .collection("orders")
      .insertOne(order);

    if (response.acknowledged) {
      res.status(201).json({ 
        message: 'Order created', 
        orderId: response.insertedId 
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the order.');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = { deleteOrder, updateOrder, getAllOrders, getOrderById, createOrder };
