import { useAuthStore } from "@/store/auth/auth";
import { useUserStore } from "@/store/auth/user";
import { useThemeStore } from "@/store/colorTheme/colorTheme";
import React, { useEffect, useState } from "react";
import {
  HiMenuAlt1,
  HiMoon,
  HiSun,
  HiOutlineCog,
  HiChevronDown,
} from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiUserCircle } from "react-icons/bi";
import { AiFillBell, AiOutlineClockCircle, AiOutlinePoweroff } from "react-icons/ai";
import Image from "next/image";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
interface PropsetState {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NavBar = (props: PropsetState) => {

  const { colorTheme, toggleTheme, initTheme } = useThemeStore();
  const { currentUser, userName, userEmail } = useUserStore((state) => state);
  useEffect(() => {
    initTheme();
  }, [initTheme]);
  const clear = useAuthStore((state) => state.clear);
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: BiUserCircle,
      href: '#'
    },
    {
      label: "Edit Profile",
      icon: HiOutlineCog,
      href: "#"
    },
    {
      label: "Sign Out",
      icon: AiOutlinePoweroff,
      onclick: handleSignOut
    },
  ];
  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-[#1E1E2D] border-[#323248] border-l-0 border-t-0 border-r-0">
        <div className="flex items-center justify-between font-medium text-white">
          <Link href="/home/product" className="flex">
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
              className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white"
            >
              Material Tailwind
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <Menu>
              <MenuHandler>
                <IconButton variant="text" className="text-white">
                  <AiFillBell className="h-5 w-5" />
                </IconButton>
              </MenuHandler>
              <MenuList className="flex flex-col gap-2">
                <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                  <Avatar
                    variant="circular"
                    alt="candice wu"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      <span className="font-medium text-blue-gray-900">Wu</span>{" "}
                      send you a message
                    </Typography>
                    <Typography
                      variant="small"
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      <AiOutlineClockCircle className="h-3 w-3" />
                      13 minutes ago
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                  <Avatar
                    variant="circular"
                    alt="natali craig"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      <span className="font-medium text-blue-gray-900">
                        Natali
                      </span>{" "}
                      reply to your email
                    </Typography>
                    <Typography
                      variant="small"
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      <AiOutlineClockCircle className="h-3 w-3" />a hour ago
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                  <Avatar
                    variant="circular"
                    alt="paypal"
                    src="https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      <span className="font-medium text-blue-gray-900">
                        PayPal
                      </span>{" "}
                      you&apos;ve received a payment.
                    </Typography>
                    <Typography
                      variant="small"
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      <AiOutlineClockCircle className="h-3 w-3" />5 hours ago
                    </Typography>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
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
                  <Typography className="block text-sm text-white font-bold">
                    {session?.user.name}
                  </Typography>
                  <HiChevronDown
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform text-white font-bold ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-0 bg-[#1E1E2D] border-gray-700">
                <Typography className="pt-3 px-4 flex items-center gap-2 text-white font-bold">
                  {session?.user.name}
                </Typography>
                <Typography className="px-4 pb-4 flex items-center gap-2 text-sm font-medium text-gray-400">
                  {session?.user.email}
                </Typography>
                <hr className="w-full border-gray-700 pb-1" />
                {profileMenuItems.map(({ label, icon, onclick, href }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;
                  return (
                    <MenuItem
                      key={label}
                      onClick={onclick}
                      className={`flex items-center gap-2 rounded px-4 text-white ${
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
            <button
              type="button"
              className="text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-xl p-2.5"
              onClick={toggleTheme}
            >
              {colorTheme === "dark" ? (
                <HiSun aria-label="Currently dark mode" />
              ) : (
                <HiMoon aria-label="Currently light mode" />
              )}
            </button>
          </div>
        </div>
      </Navbar>
    </>
  );
};
