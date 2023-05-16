import React from "react";
import { HiChartPie } from "react-icons/hi";
import { ImStatsBars2 } from "react-icons/im";
import { FaMoneyCheck, FaShippingFast } from "react-icons/fa";
import { AiFillGift, AiFillSetting, AiTwotoneTag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { TbAppsFilled } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Sidebar } from "flowbite-react";
interface PropsetState {
  collapsed: boolean;
}
export const SideBar = (props: PropsetState) => {
  const sidebarItems = [
    { href: "#", icon: HiChartPie, label: "Tổng quan", gap1: true },
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
    { href: "#", icon: AiFillSetting, label: "Setting", gap: true },
  ];

  return (
    <>
      <Sidebar
        id="logo-sidebar"
        aria-label="Sidebar"
        className={`${props.collapsed ? "w-72" : "w-20"} duration-300`}
        collapsed={!props.collapsed}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Logo className="text-white" href="#" img="/img/logo.png" imgAlt="Flowbite logo">
              Flowbite
            </Sidebar.Logo>
            {sidebarItems.map((item, index) =>
              item.children ? (
                <Sidebar.Collapse
                  key={index}
                  icon={item.icon}
                  label={item.label}
                >
                  {item.children.map((child, childIndex) => (
                    <Sidebar.Item key={childIndex} href={child.href}>
                      {child.label}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item
                  className={`${item.gap && "mt-6 border-t border-gray-700"}`}
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
    </>
  );
};
