import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";


export const SidebarData = [
  {
    title: "หน้าหลัก",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "ส่งเครื่องให้ผู้ป่วย",
    path: "/Give",
    icon: <AiIcons.AiFillCar />,
    cName: "nav-text"
  },
  {
    title: "เพิ่มเครื่อง",
    path: "/AddMachine",
    icon: <RiIcons.RiHeartAddFill />,
    cName: "nav-text"
  },
  {
    title: "ตั้งค่าผู้ใช้งาน",
    path: "/Admin",
    icon: <FaIcons.FaUserPlus />,
    cName: "nav-text"
  },
  {
    title: "เข้าสู่ระบบ",
    path: "/Login",
    icon: <RiIcons.RiLoginBoxFill />,
    cName: "nav-text"
  }
];
