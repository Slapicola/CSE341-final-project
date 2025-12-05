//require statements go up here
const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;


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

module.exports = { deleteUser };