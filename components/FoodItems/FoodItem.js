import Link from "next/link";
import { useRouter } from "next/router";
import Card from "../UI/Card";

const FoodItem = (props) => {
  const router = useRouter();

  const millisPerDay = 86400000;
  const expiryDate = new Date(props.expiry_date);
  const entryDate = new Date(props.entry_date);
  const daysUntilExpiryDate =
    (expiryDate.getTime() - entryDate.getTime()) / millisPerDay;
  const outputString =
    daysUntilExpiryDate <= 0
      ? "Expired"
      : daysUntilExpiryDate <= 1 && daysUntilExpiryDate > 0
      ? "Today"
      : daysUntilExpiryDate > 1 && daysUntilExpiryDate < 2
      ? "Tomorrow"
      : `${daysUntilExpiryDate}`;

  const onEditHandler = () => {
    router.push(`/items/${props.id}/edit`);
  };

  const onDeleteHandler = () => {
    router.push(`/items/${props.id}/delete`);
  };

  const expiryStyles =
    daysUntilExpiryDate < 1
      ? "flex bg-red-200 items-center border border-red-200 hover:bg-red-100 hover:shadow-md transition ease-in-out duration-300"
      : daysUntilExpiryDate < 4
      ? "flex bg-yellow-200 items-center border border-yellow-200 hover:bg-yellow-100 hover:shadow-md transition ease-in-out duration-300"
      : "flex items-center border border-gray-100 hover:bg-gray-100 hover:shadow-md transition ease-in-out duration-300";

  return (
    <li className="my-3 mx-10 px-5 hover:scale-105 transition ease-in-out duration-300">
      <Card className={expiryStyles}>
        <Link
          className="flex flex-1 items-center"
          key={props.id}
          href="/items/[itemId]"
          as={`/items/${props.id}`}
        >
          <div className="mr-4">
            <img src={props.image_url === "" ? "" : props.image_url} alt="" />
          </div>
          <div className="w-48">
            <span className="font-bold text-xl">{props.name}</span>
            <br />
            {daysUntilExpiryDate <= 0 ? (
              <span className="font-bold text-lg text-red-400 underline">
                {outputString}
              </span>
            ) : (
              <span className="text-gray-700 text-stone-400 underline">
                Expires{outputString == daysUntilExpiryDate && <span> in</span>}{" "}
                <span className="font-bold text-lg text-red-400 underline">
                  {outputString}
                </span>{" "}
                {daysUntilExpiryDate == 1 ? "" : <span>days</span>}
              </span>
            )}
          </div>
          <div className="ml-10">
            {props.location === "fridge" ? (
              <span className="text-cyan-500 font-bold">
                Location: {props.location}
              </span>
            ) : props.location === "freezer" ? (
              <span className="text-blue-500 font-bold">
                Location: {props.location}
              </span>
            ) : (
              <span className="text-orange-500 font-bold">
                Location: {props.location}
              </span>
            )}
          </div>
        </Link>
        <div className="flex justify-end pr-3">
          <button
            onClick={onEditHandler}
            className="mr-2 bg-green-400 hover:scale-105 hover:bg-green-500 transition ease-in-out duration-300 text-white font-bold py-2 px-3 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={onDeleteHandler}
            className="bg-red-400 hover:scale-105 hover:bg-red-500 transition ease-in-out duration-300 text-white font-bold py-2 px-3 rounded-lg"
          >
            Delete
          </button>
        </div>
      </Card>
    </li>
  );
};

export default FoodItem;
