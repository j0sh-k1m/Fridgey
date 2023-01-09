import Link from "next/link";
import { useRouter } from "next/router";

const MainNavigation = () => {
  const router = useRouter();
  const onLogoutHandler = () => {
    router.push("/");
  };
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-green-400 text-white">
      <Link
        href="/"
        className="ml-8 font-bold text-4xl underline hover:scale-110 transition ease-in-out duration-300"
      >
        Fridgey.
      </Link>
      <Link
        href="/search-food-item"
        className="mr-8 rounded-lg bg-white py-2 px-4 text-green-800 hover:scale-105 hover:bg-green-200 transition ease-in-out duration-300"
      >
        Search a Food Item
      </Link>
      <Link
        href="/new-food-item"
        className="mr-8 rounded-lg bg-white py-2 px-4 text-green-800 hover:scale-105 hover:bg-green-200 transition ease-in-out duration-300"
      >
        Add Food Item
      </Link>
      <button onClick={onLogoutHandler} className="mr-8 rounded-lg bg-white py-2 px-4 text-green-800 hover:scale-105 hover:bg-green-200 transition ease-in-out duration-300">
        Logout
      </button>
    </nav>
  );
};

export default MainNavigation;
