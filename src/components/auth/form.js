import { createUser } from "@/pages/services/signup";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Form({ signin }) {
  const [loading, setLoading] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {signin ? "Sign in to your account" : "Signup for new account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                  }
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {userExist && (
              <p className="bg-red-500 p-2 text-white text-sm">
                User already exist
              </p>
            )}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={user.password}
                  onChange={(event) =>
                    setUser({ ...user, password: event.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href={signin ? "/auth/signup" : "/auth/login"}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {signin
                    ? "Do not have an account? Signup"
                    : "Already have an account? Sign in"}
                </Link>
              </div>
            </div>
            <div>
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    const allUsers = await (
                      await fetch("http://localhost:3000/api/user", {
                        method: "GET",
                      })
                    ).json();
                    const isUserExist = allUsers.find(
                      (u) => u.email === user.email
                    );
                    if (!isUserExist) {
                      await fetch("http://localhost:3000/api/user", {
                        method: "POST",
                        body: JSON.stringify(user),
                      });
                    } else {
                      setUserExist(true);
                    }
                  } catch (error) {
                    console.error(error);
                    setLoading(false);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {!loading ? (signin ? "Sign in" : "Sign up") : "Loading..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
