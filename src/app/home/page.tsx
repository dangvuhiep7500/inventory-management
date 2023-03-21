"use client";

import Link from "next/link";
import React, { FC, useState } from "react";
import { HiChartPie} from "react-icons/hi";
import { ImStatsBars2 } from "react-icons/im";
import { FaMoneyCheck, FaShippingFast } from "react-icons/fa";
import { AiFillGift, AiFillSetting, AiTwotoneTag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { TbAppsFilled } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavBar } from "./header/NavBar";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(true);
    const iconClassName = "flex-shrink-0 h-6 w-6 cursor-pointer text-gray-300";
    const Menus = [
      {
        title: "Tổng quan",
        icon: <HiChartPie className={iconClassName} />,
      },
      {
        title: "Đơn Hàng",
        icon: <AiOutlineShoppingCart className={iconClassName} />,
        options: ["Tất cả đơn hàng", "Đơn hàng nhập", "Chưa hoàn tất"],
        dropId: "dropdown-cart",
      },
      {
        title: "Vận Chuyển",
        icon: <FaShippingFast className={iconClassName} />,
        options: ["Tổng quan", "Vận chuyển", "Quản lý thu hộ"],
        dropId: "dropdown-ship",
      },
      {
        title: "Sản Phẩm",
        icon: <AiTwotoneTag className={iconClassName} />,
        options: ["Tất cả sản phẩm", "Nhóm sản phẩm", "Tồn kho"],
        dropId: "dropdown-product",
      },
      { title: "Khách Hàng", icon: <BiUserCircle className={iconClassName} /> },
      {
        title: "Số Quỹ",
        icon: <FaMoneyCheck className={iconClassName} />,
        options: ["Số quỹ", "Công nợ"],
        dropId: "dropdown-fund",
      },
      { title: "Khuyến Mãi", icon: <AiFillGift className={iconClassName} /> },
      { title: "Thống Kê", icon: <ImStatsBars2 className={iconClassName} /> },
      { title: "Ứng Dụng", icon: <TbAppsFilled className={iconClassName} /> },
      {
        title: "Setting",
        icon: <AiFillSetting className={iconClassName} />,
        gap: true,
      },
    ];
    const [isHovered, setIsHovered] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(
      Array(Menus.length).fill(false)
    );
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-screen overflow-hidden bg-[#1E1E2D]">
          <aside
            id="logo-sidebar"
            aria-label="Sidebar"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${collapsed ? "w-72" : "w-20"} duration-300 hover:w-72`}
          >
            <div className="relative top-0 left-0 z-40 h-full overflow-y-auto overflow-x-hidden">
              <div
                className={`flex px-4 py-3 gap-x-3 items-center border-b border-gray-700 border-dashed`}
              >
                <img
                  src="/img/logo.png"
                  className={`cursor-pointer duration-500 ${
                    collapsed && "rotate-[360deg]"
                  }`}
                />
                <h1
                  className={`text-gray-400 origin-left font-medium text-xl duration-200 ${
                    !collapsed && "overflow-hidden"
                  }`}
                >
                  Designer
                </h1>
              </div>
              <ul className="pt-6 px-4">
                {Menus.map((Menu, index) => (
                  <li
                    key={index}
                    className={`${Menu.gap ? "mt-9" : "mt-2"} ${
                      index === 0 && "bg-light-white"
                    } `}
                  >
                    <a
                      href={`${Menu.options ? "#" : "/"}`}
                      className="group flex items-center text-base gap-3.5 p-2 font-medium rounded-lg group text-gray-400 hover:text-white"
                      aria-controls={Menu.dropId}
                      data-collapse-toggle={Menu.dropId}
                      onClick={() => {
                        const newSubMenuOpen = [...subMenuOpen];
                        newSubMenuOpen[index] = !newSubMenuOpen[index];
                        setSubMenuOpen(newSubMenuOpen);
                      }}
                    >
                      {Menu.icon}
                      <span
                        className={`${
                          !collapsed && "overflow-hidden"
                        } whitespace-pre flex-1`}
                      >
                        {Menu.title}
                      </span>
                      {Menu.options && (
                        <svg
                          className={`w-6 h-6 rotate-[270deg] duration-200
                        ${subMenuOpen[index] && "rotate-[360deg]"}
                         ${!collapsed && "overflow-hidden"}`}
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
                      )}
                    </a>
                    {Menu.options && subMenuOpen && (
                      <ul id={Menu.dropId} className={`hidden py-2 space-y-2 `}>
                        {Menu.options?.map((option) => (
                          <li key={option}>
                            {collapsed ? (
                              <a
                                href="#"
                                className={`flex items-center w-full px-5 p-2 text-base font-medium text-gray-400 hover:text-white transition duration-75 rounded-lg pl-11 group`}
                              >
                                {option}
                              </a>
                            ) : (
                              <a
                                href="#"
                                className={`flex items-center w-full p-2 text-base font-medium text-gray-400 hover:text-white transition duration-75 rounded-lg group`}
                              >
                                {isHovered ? (
                                  <span className="pl-11">{option}</span>
                                ) : (
                                  <span className="pl-2">
                                    {option.charAt(0)}
                                  </span>
                                )}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="flex-1 overflow-auto bg-[#F5F8FA] dark:bg-[#151521]">
            <NavBar collapsed={collapsed} setCollapsed={setCollapsed}/>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
