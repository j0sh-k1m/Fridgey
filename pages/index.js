import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';

const LoginPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const goToFridgeyHandler = () => {
    setCookie('email', session.user.email);
    router.push("/items");
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center mt-28">
        <div className="text-9xl underline font-bold text-white bg-green-400 px-8 py-7 rounded-lg shadow-lg">
          Fridgey.
        </div>
        <div className="text-4xl text-white bg-emerald-300 rounded-lg px-2 py-2 mt-12">
          Welcome!{" "}
          <span className="text-4xl font-bold underline">
            {session.user.email}
          </span>
        </div>
        <div className="mt-6">
          <button
            onClick={goToFridgeyHandler}
            className="px-4 py-2 font-bold hover:scale-110 text-white bg-green-400 rounded-lg shadow-lg hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 ease-in-out transition duration-300"
          >
            Go to Fridgey!
          </button>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 font-bold hover:scale-110 text-green-400 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline-green active:bg-green-600 ml-4 ease-in-out transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center mt-28">
        <div className="text-9xl underline font-bold text-white bg-green-400 px-8 py-7 rounded-lg shadow-lg">
          Fridgey.
        </div>
        <div className="text-4xl text-white font-bold bg-emerald-300 rounded-lg px-2 py-2 mt-12">
          Login To Fridgey With Your Google Account!
        </div>
        <div className="mt-4">
          <button
            onClick={() => signIn()}
            className="px-4 py-2 mt-4 font-bold hover:scale-110 text-white bg-green-400 rounded-lg shadow-lg hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 ease-in-out transition duration-300"
          >
            Login With Google
          </button>
        </div>
      </div>
    );
  }
};

export default LoginPage;
