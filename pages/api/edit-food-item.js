import { MongoClient, ObjectId } from "mongodb";
require("dotenv").config();

const handler = async (req, res) => {
  if (req.method === "PATCH") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(
        `mongodb+srv://joshFridgey:${process.env.SERVER_PASSWORD}@cluster0.s6p97p0.mongodb.net/fridgey?retryWrites=true&w=majority`
      );

      const db = client.db();

      const foodItemCollection = db.collection("foodItems");

      const filter = { _id: ObjectId(data._id) };
      const update = {
        $set: {
          name: data.name,
          type: data.type,
          expiry_date: data.expiry_date,
          location: data.location,
          description: data.description,
        },
      };

      const result = await foodItemCollection.findOneAndUpdate(filter, update);

      console.log(result);

      client.close();

      res.status(201).json({ message: "Food Item Edited" });
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  }
};

export default handler;
