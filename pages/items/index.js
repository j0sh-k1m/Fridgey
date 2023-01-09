// our-domain.com/

import { MongoClient } from "mongodb";
import { Fragment } from "react";
import AllFoodItems from "../../components/FoodItems/AllFoodItems";
import MainNavigation from "../../components/layout/MainNavigation";
import { useSession, signIn, getSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { parseCookies } from "nookies";

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

export const getServerSideProps = async ({req}) => {
  const session = await getSession({ req });
  const cookies = parseCookies()
  const user = cookies?.user ? JSON.parse(cookies.user) : session?.user;
  const email = user?.email;

  const client = await MongoClient.connect(
    `mongodb+srv://joshFridgey:${process.env.SERVER_PASSWORD}@cluster0.s6p97p0.mongodb.net/fridgey?retryWrites=true&w=majority`
  );
  const db = client.db();

  const foodItemCollection = db.collection("foodItems");

  const foodItems = await foodItemCollection.find().toArray();

  foodItemCollection.createIndex({ days_till_expiry: 1 });

  const cooked_dishFoodItems = await foodItemCollection
    .find({ type: "cooked-dish", email: email })
    .toArray();

  const cooked_dishFoodItemsSorted = await foodItemCollection
    .find({ type: "cooked-dish", email: email })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const dairyFoodItems = await foodItemCollection
    .find({ type: "dairy", email: email })
    .toArray();

  const dairyFoodItemsSorted = await foodItemCollection
    .find({ type: "dairy", email: email })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const meatFoodItems = await foodItemCollection
    .find({ type: "meat", email: email })
    .toArray();

  const meatFoodItemsSorted = await foodItemCollection
    .find({ type: "meat", email: email })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const vegetableFoodItems = await foodItemCollection
    .find({ type: "vegetable", email: email })
    .toArray();

  const vegetableFoodItemsSorted = await foodItemCollection
    .find({ type: "vegetable", email: email })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const fruitFoodItems = await foodItemCollection
    .find({ type: "fruit", email: email })
    .toArray();

  const fruitFoodItemsSorted = await foodItemCollection
    .find({ type: "fruit", email: email })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const dessertFoodItems = await foodItemCollection
    .find({ type: "dessert", email: email })
    .toArray();

  const dessertFoodItemsSorted = await foodItemCollection
    .find({ type: "dessert", email: email })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const drinkItems = await foodItemCollection
    .find({ type: "drink", email: email })
    .toArray();

  const drinkItemsSorted = await foodItemCollection
    .find({ type: "drink", email: email })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  const otherFoodItems = await foodItemCollection
    .find({ type: "other", email: email })
    .toArray();

  const otherFoodItemsSorted = await foodItemCollection
    .find({ type: "other", email: email })
    .sort({ days_till_expiry: 1 })
    .hint({ days_till_expiry: 1 })
    .toArray();

  client.close();

  return {
    props: {  
      email: email, 
      foodItems: foodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      cooked_dishFoodItems: cooked_dishFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
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
      })),
      dairyFoodItemsSorted: dairyFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      meatFoodItems: meatFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      meatFoodItemsSorted: meatFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      vegetableFoodItems: vegetableFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      vegetableFoodItemsSorted: vegetableFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      fruitFoodItems: fruitFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      fruitFoodItemsSorted: fruitFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      dessertFoodItems: dessertFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      dessertFoodItemsSorted: dessertFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      drinkItems: drinkItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      drinkItemsSorted: drinkItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      otherFoodItems: otherFoodItems.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
      otherFoodItemsSorted: otherFoodItemsSorted.map((foodItem) => ({
        name: foodItem.name,
        type: foodItem.type,
        image_url: foodItem.image_url,
        expiry_date: foodItem.expiry_date,
        location: foodItem.location,
        id: foodItem._id.toString(),
        entry_date: foodItem.entry_date,
      })),
    }, 
  };
};

export default HomePage;
