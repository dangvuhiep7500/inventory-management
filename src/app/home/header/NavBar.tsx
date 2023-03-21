import React, { createContext, useEffect, useState } from "react";
import { HiMenuAlt1, HiMoon, HiSun } from "react-icons/hi";
interface PropsetState {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  }
  export const NavBar = (props: PropsetState) => {
  const [colorTheme, setColorTheme] = useState<string | null>(null);
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedColorTheme = localStorage.getItem("color-theme");
    if (storedColorTheme === "dark" || (!storedColorTheme && prefersDarkMode)) {
      setColorTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setColorTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);
  function handleThemeToggle() {
    if (colorTheme === "light") {
      setColorTheme("dark");
      localStorage.setItem("color-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setColorTheme("light");
      localStorage.setItem("color-theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }
  return (
    <>
      <nav className="sticky px-2 top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-[#1E1E2D] dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div className="flex items-center">
                <HiMenuAlt1
                  className="mr-6 h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-400"
                  onClick={() => props.setCollapsed(!props.collapsed)}
                />
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="mr-2">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-xl p-2.5"
                  onClick={handleThemeToggle}
                >
                  {colorTheme === "dark" ? (
                    <HiSun aria-label="Currently dark mode" />
                  ) : (
                    <HiMoon aria-label="Currently light mode" />
                  )}
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  className="flex bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    Neil Sims
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      </>
  );
};
