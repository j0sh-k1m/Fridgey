import { useRouter } from "next/router";
import { Fragment } from "react";
import FoodItemForm from "../../components/FoodItems/FoodItemForm";
import MainNavigation from "../../components/layout/MainNavigation";
import { useSession } from "next-auth/react";

const NewFoodItemForm = () => {
  const { data: session, status } = useSession({ required: true });

  const router = useRouter();

  const addFoodItemHanlder = async (enteredFoodData) => {
    // fetch the urls for the correct picture type depending on what type the data holds
    enteredFoodData.image_url = "";
    enteredFoodData.entry_date = new Date().toISOString().split("T")[0];
    enteredFoodData.email = session.user.email;

    const millisPerDay = 86400000;
    const expiryDate = new Date(enteredFoodData.expiry_date);
    const entryDate = new Date(enteredFoodData.entry_date);
    const daysUntilExpiryDate =
      (expiryDate.getTime() - entryDate.getTime()) / millisPerDay;
    enteredFoodData.days_till_expiry = daysUntilExpiryDate;

    const response = await fetch("/api/new-food-item", {
      method: "POST",
      body: JSON.stringify(enteredFoodData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/items");
  };

  if (status === "authenticated") {
    return (
      <Fragment>
        <MainNavigation />
        <FoodItemForm onAddFoodItem={addFoodItemHanlder} />
      </Fragment>
    );
  }
};

export default NewFoodItemForm;
