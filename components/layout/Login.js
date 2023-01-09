import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const goToFridgeyHandler = () => {
    router.push("/items");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-5xl font-bold text-white bg-green-400 p-4 rounded-lg shadow-lg">
        Fridgey
      </div>
      <div className="text-xl font-bold text-gray-800 mt-4">Welcome!</div>
      <div className="mt-4">
        <button
          onClick={goToFridgeyHandler}
          className="px-4 py-2 font-bold text-white bg-green-400 rounded-full shadow-lg hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600"
        >
          Go to Fridgey!
        </button>
        <button
          onClick={signOut()}
          className="px-4 py-2 font-bold text-white bg-green-400 rounded-full shadow-lg hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 ml-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};


export default Login;
