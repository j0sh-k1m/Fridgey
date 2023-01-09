import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Card from "../UI/Card";

const DeleteFoodItem = (props) => {
  const router = useRouter();
  const onCancelHandler = () => {
    router.push("/items");
  };

  const onDeleteHandler = () => {
    props.deleteFoodItemHandler(router.query.itemId);
  };

  return (
    <Fragment>
      <Card className="my-10 mx-80 border border-gray-100">
        <div className="grid grid-cols-1 place-items-center py-10 shadow-lg">
          <h1 className="underline font-bold text-lg">
            Would You Like to Delete This Item?
          </h1>
          <div className="mt-3 space-x-4">
            <button
              onClick={onCancelHandler}
              className="bg-blue-400 hover:scale-105 hover:bg-blue-500 transition ease-in-out duration-300 text-white font-bold py-2 px-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={onDeleteHandler}
              className="bg-red-400 hover:scale-105 hover:bg-red-500 transition ease-in-out duration-300 text-white font-bold py-2 px-3 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </Card>
      {/* Insert a "Dummy"/Placeholder version of what is to be deleted */}
    </Fragment>
  );
};

export default DeleteFoodItem;
