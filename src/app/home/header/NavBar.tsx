import { useAuthStore } from "@/store/auth/auth";
import { useUserStore } from "@/store/auth/user";
import { useThemeStore } from "@/store/colorTheme/colorTheme";
import { Avatar, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiMenuAlt1, HiMoon, HiSun } from "react-icons/hi";

interface PropsetState {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NavBar = (props: PropsetState) => {
  const { colorTheme, toggleTheme, initTheme } = useThemeStore();
  const { currentUser,userName, userEmail } = useUserStore((state) => state);
  useEffect(() => {
    initTheme();
  }, []);
  const clear = useAuthStore((state) => state.clear);
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
                  onClick={toggleTheme}
                >
                  {colorTheme === "dark" ? (
                    <HiSun aria-label="Currently dark mode" />
                  ) : (
                    <HiMoon aria-label="Currently light mode" />
                  )}
                </button>
              </div>
              <Dropdown
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded={true}
                  >
                    <div className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white">
                    {userName}
                    <svg
                      className="w-4 h-4 mx-1.5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    </div>
                  </Avatar>
                }
                arrowIcon={false}
                inline={true}
              >
                <Dropdown.Header>
                  <span className="block text-sm">{userName}</span>
                  <span className="block truncate text-sm font-medium">
                    {userEmail}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <a href="/auth/signin">
                <Dropdown.Item onClick={() => clear()}>Sign out</Dropdown.Item>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
