//require statements go up here
const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

// --- GET ALL USERS ---
const getAllUsers = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db();
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// --- GET USER BY ID ---
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!objectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const db = mongodb.getDatabase().db();
    const user = await db
      .collection("users")
      .findOne({ _id: new objectId(id) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

//Delete function for user collection
const deleteUser = async (req, res) => {
  try {
    const userId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase() 
      .db()
      .collection('users') 
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleteing the user."
        );
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = new objectId(req.params.id);
    const userUpdates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };

    if (Object.keys(userUpdates).length === 0) {
      return res.status(400).json({ message: 'No data provided for update' });
    }

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .updateOne({ _id: userId }, { $set: userUpdates });

      if (response.matchedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(200).json({ message: 'No changes made to the user' });
      }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .insertOne(user);

    if (response.acknowledged) {
      res.status(201).json({ 
        message: 'User created', 
        userId: response.insertedId 
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = { deleteUser, updateUser, getAllUsers, getUserById, createUser };