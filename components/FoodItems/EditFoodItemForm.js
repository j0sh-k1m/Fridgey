import Link from "next/link";
import { useRef, useState } from "react";
import Card from "../UI/Card";

const EditFoodItemForm = (props) => {
  const nameInputRef = useRef();
  const typeInputRef = useRef();
  const expiryInputRef = useRef();
  const locationInputRef = useRef();
  const descriptionInputRef = useRef();

  const [nameError, setNameError] = useState({});
  const [expiryError, setExpiryError] = useState({});
  const [descriptionError, setDescriptionError] = useState({});
  const [typeError, setTypeError] = useState({});
  const [locationError, setLocationError] = useState({});

  // Adding new Food Item
  const onChangeHanlder = () => {
    const enteredName = nameInputRef.current.value;
    const enteredExpiry = expiryInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredType = typeInputRef.current.value;

    if (enteredName === "") {
      setNameError({ borderColor: "red" });
    } else if (enteredName !== "") {
      setNameError({});
    }

    if (enteredExpiry === "") {
      setExpiryError({ borderColor: "red" });
    } else if (enteredExpiry !== "") {
      setExpiryError({});
    }

    if (enteredDescription === "") {
      setDescriptionError({ borderColor: "red" });
    } else if (enteredDescription !== "") {
      setDescriptionError({});
    }

    if (enteredType === "") {
      setTypeError({ borderColor: "red" });
    } else if (enteredType !== "") {
      setTypeError({});
    }

    if (enteredLocation === "") {
      setLocationError({ borderColor: "red" });
    } else if (enteredLocation !== "") {
      setLocationError({});
    }
  };

  const onEditHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    const enteredExpiry = expiryInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (enteredName === "") {
      setNameError({ borderColor: "red" });
    }

    if (enteredExpiry === "") {
      setExpiryError({ borderColor: "red" });
    }

    if (enteredDescription === "") {
      setDescriptionError({ borderColor: "red" });
    }

    if (
      enteredDescription === "" ||
      enteredName === "" ||
      enteredExpiry === "" ||
      enteredLocation === "" ||
      enteredType === ""
    ) {
      return;
    }

    const foodItemData = {
      _id: props.foodItem._id,
      name: enteredName,
      type: enteredType,
      expiry_date: enteredExpiry,
      location: enteredLocation,
      description: enteredDescription,
      entry_date: props.foodItem.entry_date,
      image_url: "",
    };

    props.editFoodItemHandler(foodItemData);
  };

  return (
    <Card className="m-4">
      <h1 className="bg-blue-100 pt-6 text-2xl font-bold pb-4 text-center rounded-t-lg shadow-md">
        Edit Food Item
      </h1>
      <form className="bg-blue-100 shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Item Name:
          </label>
          <input
            placeholder={props.foodItem.name}
            onChange={onChangeHanlder}
            style={nameError}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            required
            id="name"
            ref={nameInputRef}
          ></input>
        </div>
        {/* Try to make a More Robust Selector Component  */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Select Item Type:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            ref={typeInputRef}
            onChange={onChangeHanlder}
            style={typeError}
          >
            <option value="cooked-dish">Cooked Dish</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meat</option>
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="expiry-date"
          >
            Best Before/Expiry Date:
          </label>
          <input
            placeholder={props.foodItem.expiry_date}
            onChange={onChangeHanlder}
            style={expiryError}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            required
            id="expiry-date"
            ref={expiryInputRef}
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            ref={locationInputRef}
            style={locationError}
          >
            <option value="freezer">Freezer</option>
            <option value="fridge">Fridge</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Item/Location Description:
          </label>
          <input
            placeholder={props.foodItem.description}
            onChange={onChangeHanlder}
            style={descriptionError}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            rows="5"
            required
            id="description"
            ref={descriptionInputRef}
          ></input>
        </div>
        <div className="mt-5">
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out duration-300"
            type="submit"
            onClick={onEditHandler}
          >
            Edit
          </button>
          <Link href="/items" className="float-right">
            <button className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out duration-300">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default EditFoodItemForm;
