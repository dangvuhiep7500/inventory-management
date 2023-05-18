import { useAuthStore } from "@/store/auth/auth";
import { useUserStore } from "@/store/auth/user";
import { useThemeStore } from "@/store/colorTheme/colorTheme";
import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiMenuAlt1, HiMoon, HiSun, HiOutlineCog, HiChevronDown } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlinePoweroff } from "react-icons/ai";
import Image from "next/image";
import { Avatar, Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, MobileNav, Navbar, Typography } from "@material-tailwind/react";
interface PropsetState {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NavBar = (props: PropsetState) => {
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: BiUserCircle,
    },
    {
      label: "Edit Profile",
      icon: HiOutlineCog,
    },
    {
      label: "Sign Out",
      icon: AiOutlinePoweroff,
    },
  ];
  const { colorTheme, toggleTheme, initTheme } = useThemeStore();
  const { currentUser,userName, userEmail } = useUserStore((state) => state);
  useEffect(() => {
    initTheme();
  }, [initTheme]);
  const clear = useAuthStore((state) => state.clear);
  const { data: session} = useSession();
  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <>
      {/* <nav className="sticky px-2 top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-[#1E1E2D] dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div className="flex items-center">
                <HiMenuAlt1
                  className="mr-6 h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-400"
                  onClick={() => props.setCollapsed(!props.collapsed)}
                />
                <Image
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  width={30}
                  height={30}
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
                    {session!.user.name}
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
                  <span className="block text-sm">{session?.user.name}</span>
                  <span className="block truncate text-sm font-medium">
                  {session?.user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav> */}
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-white dark:bg-[#1E1E2D] dark:border-gray-700 border-l-0 border-t-0 border-r-0">
        <div className="flex items-center justify-between font-medium dark:text-white">
          <div className="flex">
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5 mr-6"
            src="https://flowbite.com/docs/images/logo.svg"
          />
          <Typography
            as="a"
            href="#"
            className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
          >
            Material Tailwind
          </Typography>
          </div>
          <div className="flex items-center gap-4">
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="candice wu"
                    className="border border-blue-500 p-0.5"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                  <Typography className="block text-sm dark:text-white font-bold">{session?.user.name}</Typography>
                  <HiChevronDown
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform dark:text-white font-bold ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-0 bg-white dark:bg-[#1E1E2D] dark:border-gray-700">
                <Typography className="pt-3 px-4 flex items-center gap-2 dark:text-white font-bold">
                  {session?.user.name}
                </Typography>
                <Typography className="px-4 pb-4 flex items-center gap-2 text-sm font-medium dark:text-gray-400">
                  {session?.user.email}
                </Typography>
                <hr className="w-full border-gray-700 pb-1" />
                {profileMenuItems.map(({ label, icon }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;
                  return (
                    <MenuItem
                      key={label}
                      onClick={closeMenu}
                      className={`flex items-center gap-2 rounded px-4 dark:text-white ${
                        isLastItem
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : ""
                      }`}
                    >
                      {React.createElement(icon, {
                        className: `h-4 w-4 ${
                          isLastItem ? "text-red-500" : ""
                        }`,
                        strokeWidth: 2,
                      })}
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color={isLastItem ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
            {/* <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton> */}
          </div>
        </div>
      </Navbar>
    </>
  );
};
