import React, { useState } from "react";
import { HiChartPie, HiChevronDown } from "react-icons/hi";
import { ImStatsBars2 } from "react-icons/im";
import { FaMoneyCheck, FaShippingFast } from "react-icons/fa";
import { AiFillGift, AiFillSetting, AiTwotoneTag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { TbAppsFilled } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import { Sidebar } from "flowbite-react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Collapse,
  Button,
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
  const [openc, setOpenc] = useState(false);
  const toggleOpen = () => setOpenc(cur => !cur);

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      {/* <Sidebar
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
      </Sidebar> */}
       {/* <Button onClick={toggleOpen}>Open Collapse</Button>
      <Collapse className="" open={openc}>
      </Collapse> */}
      <Card className="h-full w-64 overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-[#1E1E2D]">
        <div className="mb-2 flex flex-wrap items-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 sm:h-9"
            alt="Flowbite Logo"
            width={64}
            height={64}
          />
          <Typography variant="h5" className="text-black dark:text-white">
            Sidebar
          </Typography>
        </div>
        <List>
          {sidebarItems.map((item, index) =>
            item.children ? (
              <>
                <Accordion
                  key={index}
                  open={open === index}
                  icon={
                    <HiChevronDown
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform text-black dark:text-white ${
                        open === index ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === index}>
                    <AccordionHeader
                      onClick={() => handleOpen(index)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix className="text-black dark:text-white">
                        {item.icon}
                      </ListItemPrefix>
                      <Typography className="mr-auto font-normal text-black dark:text-white">
                        {item.label}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  {item.children.map((child, childIndex) => (
                    <AccordionBody className="py-1" key={childIndex}>
                      <List className="p-0">
                        <ListItem>
                          <ListItemPrefix>
                            {/* <HiChevronDown strokeWidth={3} className="h-3 w-5" /> */}
                          </ListItemPrefix>
                          <Typography className="mr-auto ml-5 font-normal text-black dark:text-white">
                            {child.label}
                          </Typography>
                        </ListItem>
                      </List>
                    </AccordionBody>
                  ))}
                </Accordion>
              </>
            ) : (
              <>
                <ListItem
                  key={index}
                  className={`${item.gap && "mt-6 border-t border-gray-700 "}`}
                >
                  <ListItemPrefix className="text-black dark:text-white">
                    {item.icon}
                  </ListItemPrefix>
                  <Typography className="mr-auto font-normal text-black dark:text-white">
                    {item.label}
                  </Typography>
                </ListItem>
              </>
            )
          )}
        </List>
      </Card>

    </>
  );
};
