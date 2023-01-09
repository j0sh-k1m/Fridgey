// our-domain/items/[itemId]/edit

import { MongoClient, ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import DeleteFoodItem from "../../../../components/FoodItems/DeleteFoodItem";
import MainNavigation from "../../../../components/layout/MainNavigation";
require("dotenv").config();

const DeleteFoodItemPage = (props) => {
  const router = useRouter();

  const deleteFoodItemHandler = async (itemId) => {
    const response = await fetch("/api/delete-food-item", {
      method: "DELETE",
      body: JSON.stringify({ _id: itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/items");
  };

  const { status } = useSession({ required: true });

  if (status === "authenticated") {
    return (
      <Fragment>
        <MainNavigation />
        <DeleteFoodItem
          deleteFoodItemHandler={deleteFoodItemHandler}
          foodItem={props.foodItem}
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
  const foodItemId = ObjectId(context.params.itemId);

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

export default DeleteFoodItemPage;
