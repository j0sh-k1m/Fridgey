import FoodItem from "./FoodItem";
import Card from "../UI/Card";

const FoodItemList = (props) => {
  const card_colors = [
    "bg-violet-300",
    "bg-teal-300",
    "bg-pink-300",
    "bg-green-300",
    "bg-cyan-300",
    "bg-fuchsia-300",
    "bg-blue-300",
    "bg-emerald-300",
  ];

  const styleString = `mx-20 border mt-5 mb-5 ${card_colors[props.index]}`;

  return (
    <Card className={styleString}>
      <div className="my-3 mb-5">
        <div className="flex">
          <h1 className={`mx-20 w-80 font-bold text-white text-3xl underline`}>
            {props.title}
          </h1>
        </div>
        <ul>
          {props.foodItems.map((item) => (
            <FoodItem
              key={item.id}
              id={item.id}
              image_url={item.image_url}
              name={item.name}
              type={item.type}
              expiry_date={item.expiry_date}
              location={item.location}
              entry_date={item.entry_date}
            />
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default FoodItemList;
