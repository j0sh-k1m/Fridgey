// our-domain.com/

import { MongoClient } from "mongodb";
import { Fragment } from "react";
import AllFoodItems from "../../components/FoodItems/AllFoodItems";
import MainNavigation from "../../components/layout/MainNavigation";
import { useSession, signIn, getSession } from "next-auth/react";

require("dotenv").config();

const HomePage = (props) => {
  const { status } = useSession({ required: true });

  const allFridgeItemsRecent = [
    props.cooked_dishFoodItems,
    props.dairyFoodItems,
    props.meatFoodItems,
    props.vegetableFoodItems,
    props.fruitFoodItems,
    props.dessertFoodItems,
    props.drinkItems,
    props.otherFoodItems,
  ];

  const allFridgeItemsSorted = [
    props.cooked_dishFoodItemsSorted,
    props.dairyFoodItemsSorted,
    props.meatFoodItemsSorted,
    props.vegetableFoodItemsSorted,
    props.fruitFoodItemsSorted,
    props.dessertFoodItemsSorted,
    props.drinkItemsSorted,
    props.otherFoodItemsSorted,
  ];

  if (status === "authenticated") {
    return (
      <Fragment>
        <MainNavigation />
        <AllFoodItems
          AllFoodItems={allFridgeItemsRecent}
          AllFoodItemsSorted={allFridgeItemsSorted}
        />
      </Fragment>
    );
  } else {
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>;
  }
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://joshFridgey:${process.env.SERVER_PASSWORD}@cluster0.s6p97p0.mongodb.net/fridgey?retryWrites=true&w=majority`
  );
  const db = client.db();

  const foodItemCollection = db.collection("foodItems");

  const foodItems = await foodItemCollection.find().toArray();

  foodItemCollection.createIndex({ days_till_expiry: 1 });

  const cooked_dishFoodItems = await foodItemCollection
    .find({ type: "cooked-dish" })
    .toArray();

  const cooked_dishFoodItemsSorted = await foodItemCollection
    .find({ type: "cooked-dish" })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const dairyFoodItems = await foodItemCollection
    .find({ type: "dairy" })
    .toArray();

  const dairyFoodItemsSorted = await foodItemCollection
    .find({ type: "dairy" })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const meatFoodItems = await foodItemCollection
    .find({ type: "meat" })
    .toArray();

  const meatFoodItemsSorted = await foodItemCollection
    .find({ type: "meat" })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const vegetableFoodItems = await foodItemCollection
    .find({ type: "vegetable" })
    .toArray();

  const vegetableFoodItemsSorted = await foodItemCollection
    .find({ type: "vegetable" })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const fruitFoodItems = await foodItemCollection
    .find({ type: "fruit" })
    .toArray();

  const fruitFoodItemsSorted = await foodItemCollection
    .find({ type: "fruit" })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const dessertFoodItems = await foodItemCollection
    .find({ type: "dessert" })
    .toArray();

  const dessertFoodItemsSorted = await foodItemCollection
    .find({ type: "dessert" })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const drinkItems = await foodItemCollection
    .find({ type: "drink" })
    .toArray();

  const drinkItemsSorted = await foodItemCollection
    .find({ type: "drink" })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const otherFoodItems = await foodItemCollection
    .find({ type: "other" })
    .toArray();

  const otherFoodItemsSorted = await foodItemCollection
    .find({ type: "other" })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  client.close();

  return {
    props: {   
      foodItems: foodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      cooked_dishFoodItems: cooked_dishFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      cooked_dishFoodItemsSorted: cooked_dishFoodItemsSorted.map(
        (foodItem) => ({
          name: foodItem.name,
          type: foodItem.type,
          image_url: foodItem.image_url,
          expiry_date: foodItem.expiry_date,
          location: foodItem.location,
          id: foodItem._id.toString(),
          entry_date: foodItem.entry_date,
          email: foodItem.email,
        })
      ),
      dairyFoodItems: dairyFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      dairyFoodItemsSorted: dairyFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      meatFoodItems: meatFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      meatFoodItemsSorted: meatFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      vegetableFoodItems: vegetableFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      vegetableFoodItemsSorted: vegetableFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      fruitFoodItems: fruitFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      fruitFoodItemsSorted: fruitFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      dessertFoodItems: dessertFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      dessertFoodItemsSorted: dessertFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      drinkItems: drinkItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      drinkItemsSorted: drinkItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      otherFoodItems: otherFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      otherFoodItemsSorted: otherFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
        email: foodItem.email,
      })),
      validation: 1, 
    }, 
  };
};

export default HomePage;