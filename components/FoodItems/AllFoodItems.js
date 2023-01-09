import React, { Fragment, useRef, useState } from "react";
import FoodItemList from "./FoodItemList";

const AllFoodItems = (props) => {
  const filterValue = useRef();

  const titles = [
    "Cooked Dish Items",
    "Dairy Items",
    "Meat Items",
    "Vegetable Items",
    "Fruit Items",
    "Dessert Items",
    "Drink Items",
    "Other Items",
  ];

  const [sortBy, setSortBy] = useState("recent");

  const onFilterChangeHandler = () => {
    setSortBy(filterValue.current.value);
  };

  return (
    <Fragment>
      <div className="flex mx-auto justify-center mt-5">
        <span className="mr-2 font-bold underline text-xl">
          Filter Items By:{" "}
        </span>
        <select
          className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
          ref={filterValue}
          onChange={onFilterChangeHandler}
        >
          <option style={{ textAlign: "center" }} value="recent">
            Recently Added
          </option>
          <option style={{ textAlign: "center" }} value="expiry">
            Expiry Date
          </option>
        </select>
      </div>
      {sortBy === "recent" ? (
        <ul>
          {props.AllFoodItems.map((items, index) => (
            <FoodItemList
              key={Math.random()}
              foodItems={items}
              title={titles[index]}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <ul>
          {props.AllFoodItemsSorted.map((items, index) => (
            <FoodItemList
              key={Math.random()}
              foodItems={items}
              title={titles[index]}
              index={index}
            />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default AllFoodItems;
