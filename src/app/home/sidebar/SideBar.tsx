import React, { useState } from "react";
import { HiChartPie, HiChevronDown } from "react-icons/hi";
import { ImStatsBars2 } from "react-icons/im";
import { FaMoneyCheck, FaShippingFast } from "react-icons/fa";
import { AiFillGift, AiFillSetting, AiTwotoneTag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { TbAppsFilled } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
interface PropsetState {
  collapsed: boolean;
}

export const SideBar = (props: PropsetState) => {
  const sidebarItems = [
    { href: "#", icon: <HiChartPie />, label: "Tổng quan", gap1: true },
    {
      href: "#",
      icon: <AiOutlineShoppingCart />,
      label: "Đơn hàng",
      children: [
        { href: "#", label: "Tất cả đơn hàng" },
        { href: "#", label: "Đơn hàng nhập" },
        { href: "#", label: "Chưa hoàn tất" },
      ],
    },
    {
      href: "#",
      icon: <FaShippingFast />,
      label: "Vận chuyển",
      children: [
        { href: "#", label: "Tổng quan" },
        { href: "#", label: "Vận chuyển" },
        { href: "#", label: "Quản lý thu hộ" },
      ],
    },
    {
      href: "#",
      icon: <AiTwotoneTag />,
      label: "Sản phẩm",
      children: [
        { href: "#", label: "Tất cả sản phẩm" },
        { href: "#", label: "Nhóm sản phẩm" },
        { href: "#", label: "Tồn kho" },
      ],
    },
    { href: "#", icon: <BiUserCircle />, label: "Khách hàng" },
    {
      href: "#",
      icon: <FaMoneyCheck />,
      label: "Số Quỹ",
      children: [
        { href: "#", label: "Số quỹ" },
        { href: "#", label: "Công nợ" },
      ],
    },
    { href: "#", icon: <AiFillGift />, label: "Khuyến mãi" },
    { href: "#", icon: <ImStatsBars2 />, label: "Thống kê" },
    { href: "#", icon: <TbAppsFilled />, label: "Ứng dụng" },
    { href: "#", icon: <AiFillSetting />, label: "Setting", gap: true },
  ];

  const [open, setOpen] = useState(0);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      <Card className="h-full w-[16rem] overflow-y-auto overflow-x-hidden rounded py-4 bg-[#1E1E2D]">
        <div className="mb-2 flex flex-wrap items-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 sm:h-9"
            alt="Flowbite Logo"
            width={64}
            height={64}
          />
          <Typography as="a" href="#" variant="h5" className=" text-white">
            Sidebar
          </Typography>
        </div>
        <List className="p-0 pt-3">
          {sidebarItems.map((item, index) =>
            item.children ? (
              <Accordion
                key={index}
                open={open === index}
                icon={
                  <HiChevronDown
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform text-white ${
                      open === index ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 hover:bg-gray-500 focus:bg-gray-500">
                  <AccordionHeader
                    onClick={() => handleOpen(index)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix className="text-white">
                      {item.icon}
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal text-white">
                      {item.label}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                {item.children.map((child, childIndex) => (
                  <AccordionBody className="py-1" key={childIndex}>
                    <List className="p-0 pl-4">
                      <ListItem className="focus:bg-gray-500 hover:bg-gray-500">
                        <Typography className="mr-auto ml-5 font-normal text-white">
                          {child.label}
                        </Typography>
                      </ListItem>
                    </List>
                  </AccordionBody>
                ))}
              </Accordion>
            ) : (
              <div key={index}>
                {item.gap && <hr className="my-2 border-[#323248]" />}
                <ListItem className="focus:bg-gray-500 hover:bg-gray-500">
                  <ListItemPrefix className="text-white">
                    {item.icon}
                  </ListItemPrefix>
                  <Typography className="mr-auto font-normal text-white">
                    {item.label}
                  </Typography>
                </ListItem>
              </div>
            )
          )}
        </List>
      </Card>
    </>
  );
};
