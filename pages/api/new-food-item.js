import { MongoClient } from "mongodb";
require("dotenv").config()

// api/new-food-item
// POST api/new-food-item

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(
        `mongodb+srv://joshFridgey:${process.env.SERVER_PASSWORD}@cluster0.s6p97p0.mongodb.net/fridgey?retryWrites=true&w=majority`
      );
      const db = client.db();

      const foodItemCollection = db.collection("foodItems");

      const result = await foodItemCollection.insertOne(data);

      console.log(result);

      client.close()

      res.status(201).json({message: 'Food Item inserted'});

    } catch (error) {
      console.log(error);
      console.log('error');
    }
  }
}

export default handler;
