// our-domain/items/[itemId]/edit

import { MongoClient, ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import EditFoodItemForm from "../../../../components/FoodItems/EditFoodItemForm";
import MainNavigation from "../../../../components/layout/MainNavigation";
const mongodb = require("mongodb");
require('dotenv').config();

const EditFoodItemPage = (props) => {
  const router = useRouter();

  const editFoodItemHandler = async (enteredFoodData) => {
    const response = await fetch("/api/edit-food-item", {
      method: "PATCH",
      body: JSON.stringify(enteredFoodData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/items");
  };

  const { status } = useSession({ required: true });

  if (status === 'authenticated') {
    return (
      <Fragment>
        <MainNavigation />
        <EditFoodItemForm
          foodItem={props.foodItem}
          editFoodItemHandler={editFoodItemHandler}
        />
      </Fragment>
    );
  }
};

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

export default EditFoodItemPage;
