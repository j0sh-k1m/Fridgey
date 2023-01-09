import { Fragment } from "react";
import { useRouter } from "next/router";
import MainNavigation from "../layout/MainNavigation";
import Card from "../UI/Card";

const FoodItemDetails = (props) => {
  const router = useRouter();
  const itemId = router.query.itemId;

  const backOnClickHanlder = () => {
    router.push("/items");
  };

  const onEditClickHandler = () => {
    router.push(`/items/${itemId}/edit`);
  };

  const onDeleteHandler = () => {
    router.push(`/items/${itemId}/delete`)
  };

  const millisPerDay = 86400000;
  const expiryDate = new Date(props.foodItem.expiry_date);
  const entryDate = new Date(props.foodItem.entry_date);
  const daysUntilExpiryDate =
  (expiryDate.getTime() - entryDate.getTime()) / millisPerDay;

  const styleForExpiry = daysUntilExpiryDate < 1 ? "mx-60 my-12 bg-red-300 text-white" : "mx-60 my-12 bg-blue-300 text-white"

  return (
    <Fragment>
      <MainNavigation />
      <Card className={styleForExpiry}>
        <div className="flex justify-center mb-4 pt-3">
          <h1 className="text-xl mb-4">
            <span className="">Food Item: </span>
            <span className="underline font-bold">{daysUntilExpiryDate < 1 ? <span className="text-white unerlined text-2xl">EXPIRED</span> : ""} {props.foodItem.name}</span>
          </h1>
        </div>
        {/* <img
          src={props.foodItem.image_url}
          alt={props.foodItem.name}
          className="w-full mb-4"
        /> */}
        <div className="mb-4 p-2 text-xl">
          <span className="mb-2">Food Type:</span>
          <span className="font-bold"> {props.foodItem.type}</span>
        </div>
        <div className="mb-4 p-2 text-xl">
          <span className="mb-2">Expiry Date:</span>
          <span className="font-bold"> {props.foodItem.expiry_date}</span>
        </div>
        <div className="mb-4 p-2 text-xl">
          <span className="mb-2">Location:</span>
          <span className="font-bold"> {props.foodItem.location}</span>
        </div>
        <div className="mb-4 p-2 text-xl">
          <span className="mb-2">Description:</span>
          <span className="font-bold"> {props.foodItem.description}</span>
        </div>
        <div className="mb-4 p-2 px-5 pb-4">
          <button
            onClick={backOnClickHanlder}
            className="text-gray-600 hover:text-gray-800 hover:scale-105 hover:bg-gray-300 bg-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue transtion ease-in-out duration-300"
          >
            Back
          </button>
          <button
            onClick={onEditClickHandler}
            className="ml-3 text-gray-600 hover:text-gray-800 hover:scale-105 hover:bg-gray-300 bg-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue transtion ease-in-out duration-300"
          >
            Edit
          </button>
          <button
            onClick={onDeleteHandler}
            className="flex float-right bg-red-400 hover:scale-105 hover:bg-red-500 transition ease-in-out duration-300 text-white font-bold py-2 px-3 rounded-lg"
          >
            Delete
          </button>
        </div>
      </Card>
    </Fragment>
  );
};

export default FoodItemDetails;
