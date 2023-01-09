import { MongoClient, ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import FoodItemDetails from "../../../components/FoodItems/FoodItemDetails";
const mongodb = require("mongodb");
require("dotenv").config();

// our-domain.com/items/...

function DetailPage(props) {
  //send a request to the backend API to fetch data for this item
  const { status } = useSession({ required: true });
  if (status === "authenticated") {
    return (
      <Fragment>
        <FoodItemDetails foodItem={props.foodItem} />
      </Fragment>
    );
  }
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://joshFridgey:${process.env.SERVER_PASSWORD}@cluster0.s6p97p0.mongodb.net/fridgey?retryWrites=true&w=majority`
  );
  const db = client.db();

  const foodItemCollection = db.collection("foodItems");

  const foodItems = await foodItemCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: foodItems.map((foodItem) => ({
      params: { itemId: foodItem._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  // fetch data for a single food item
  const foodItemId = new mongodb.ObjectId(context.params.itemId);

  const client = await MongoClient.connect(
    `mongodb+srv://joshFridgey:${process.env.SERVER_PASSWORD}@cluster0.s6p97p0.mongodb.net/fridgey?retryWrites=true&w=majority`
  );
  const db = client.db();

  const foodItemCollection = db.collection("foodItems");

  const selectedFoodItem = await foodItemCollection.findOne({
    _id: ObjectId(foodItemId),
  });

  selectedFoodItem._id = selectedFoodItem._id.toString();

  client.close();

  return {
    props: {
      foodItem: selectedFoodItem,
    },
  };
};

export default DetailPage;
