"use client";

import React, { useEffect, useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { ImStatsBars2 } from "react-icons/im";
import { FaMoneyCheck, FaShippingFast } from "react-icons/fa";
import { AiFillGift, AiFillSetting, AiTwotoneTag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { TbAppsFilled } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Sidebar } from "flowbite-react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
interface PropsetState {
  collapsed: boolean;
}
const icons = [
  HiChartPie,
  AiOutlineShoppingCart,
  FaShippingFast,
  AiTwotoneTag,
  BiUserCircle,
  FaMoneyCheck,
  AiFillGift,
  ImStatsBars2,
  TbAppsFilled,
  AiFillSetting,
];
export const SideBar = (props: PropsetState) => {
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
    {
      title: "Khách Hàng",
      icon: <BiUserCircle className={iconClassName} />,
    },
    {
      title: "Số Quỹ",
      icon: <FaMoneyCheck className={iconClassName} />,
      options: ["Số quỹ", "Công nợ"],
      dropId: "dropdown-fund",
    },
    {
      title: "Khuyến Mãi",
      icon: <AiFillGift className={iconClassName} />,
    },
    {
      title: "Thống Kê",
      icon: <ImStatsBars2 className={iconClassName} />,
    },
    {
      title: "Ứng Dụng",
      icon: <TbAppsFilled className={iconClassName} />,
    },
    {
      title: "Setting",
      icon: <AiFillSetting className={iconClassName} />,
      gap: true,
    },
  ];
  const sidebarItems = [
    { href: "#", icon: HiChartPie, label: "Tổng quan" },
    {
      href: "#",
      icon: AiOutlineShoppingCart,
      label: "Đơn hàng",
      children: [
        { href: "#", label: "Tất cả đơn hàng" },
        { href: "#", label: "Đơn hàng nhập" },
        { href: "#", label: "Chưa hoàn tất" },
      ],
    },
    {
      href: "#",
      icon: FaShippingFast,
      label: "Vận chuyển",
      children: [
        { href: "#", label: "Tổng quan" },
        { href: "#", label: "Vận chuyển" },
        { href: "#", label: "Quản lý thu hộ" },
      ],
    },
    {
      href: "#",
      icon: AiTwotoneTag,
      label: "Sản phẩm",
      children: [
        { href: "#", label: "Tất cả sản phẩm" },
        { href: "#", label: "Nhóm sản phẩm" },
        { href: "#", label: "Tồn kho" },
      ],
    },
    { href: "#", icon: BiUserCircle, label: "Khách hàng" },
    {
      href: "#",
      icon: FaMoneyCheck,
      label: "Số Quỹ",
      children: [
        { href: "#", label: "Số quỹ" },
        { href: "#", label: "Công nợ" },
      ],
    },
    { href: "#", icon: AiFillGift, label: "Khuyến mãi" },
    { href: "#", icon: ImStatsBars2, label: "Thống kê" },
    { href: "#", icon: TbAppsFilled, label: "Ứng dụng" },
    { href: "#", icon: AiFillSetting, label: "Setting",gap: true },
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
      <Sidebar
        id="logo-sidebar"
        aria-label="Sidebar"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // className={`${
        //   props.collapsed ? "w-72" : "w-20"
        // } duration-300 hover:w-72 `}
        collapsed={!props.collapsed}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div
              className={`flex px-4 py-1 gap-x-3 items-center border-b border-gray-700 border-dashed`}
            >
              <img
                src="/img/logo.png"
                className={`cursor-pointer duration-500 ${
                  props.collapsed && "rotate-[360deg]"
                }`}
              />
              <h1
                className={`text-gray-400 origin-left font-medium text-xl duration-200 ${
                  !props.collapsed && "overflow-hidden"
                }`}
              >
                Designer
              </h1>
              
            </div>
            {sidebarItems.map((item, index) =>
              item.children ? (
                <Sidebar.Collapse
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  theme={{
                    // inner:"h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-800"
                  }}
                >
                  {item.children.map((child, childIndex) => (
                    <Sidebar.Item key={childIndex} href={child.href}>
                      {child.label}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item
                  className={`${item.gap && "mt-6 border-t border-gray-700"} ${
                    index === 0 && "bg-light-white"
                  } `}
                  key={index}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.label}
                </Sidebar.Item>
              )
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <aside
        id="logo-sidebar"
        aria-label="Sidebar"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${
          props.collapsed ? "w-72" : "w-20"
        } duration-300 hover:w-72`}
      >
        <div className="relative top-0 left-0 z-40 h-full overflow-y-auto overflow-x-hidden">
          <div
            className={`flex px-4 py-3 gap-x-3 items-center border-b border-gray-700 border-dashed`}
          >
            <img
              src="/img/logo.png"
              className={`cursor-pointer duration-500 ${
                props.collapsed && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-gray-400 origin-left font-medium text-xl duration-200 ${
                !props.collapsed && "overflow-hidden"
              }`}
            >
              Designer
            </h1>
          </div>
          <ul className="pt-6 px-4">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`${
                  Menu.gap
                    ? "mt-9 pt-4 space-y-2 border-t border-gray-700"
                    : "mt-2"
                } ${index === 0 && "bg-light-white"} `}
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
                      !props.collapsed && "overflow-hidden"
                    } whitespace-pre flex-1`}
                  >
                    {Menu.title}
                  </span>
                  {Menu.options && (
                    <svg
                      className={`w-6 h-6 rotate-[270deg] duration-200
                        ${subMenuOpen[index] && "rotate-[360deg]"}
                         ${!props.collapsed && "overflow-hidden"}`}
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
                        {props.collapsed ? (
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
                              <span className="pl-2">{option.charAt(0)}</span>
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
    </>
  );
};
