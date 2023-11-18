import Image from "next/image";
import React from "react";
import {
  BsTwitter,
  BsBell,
  BsEnvelope,
  BsBookmark,
  BsPeople,
} from "react-icons/bs";
import { BiSolidHome, BiSearch, BiMoney } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import FeedCard from "@/components/FeedCard";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sideMenubarItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiSolidHome />,
  },
  {
    title: "Explore",
    icon: <BiSearch />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmark",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Communities",
    icon: <BsPeople />,
  },
  {
    title: "Profile",
    icon: <FaRegUser />,
  },
  {
    title: "More",
    icon: <CiCircleMore />,
  },
];

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-6">
        <div className="col-span-3 pt-1 ml-28">
          <div className="text-3xl h-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all w-fit">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {sideMenubarItems.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-2 w-fit cursor-pointer mt-2"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pr-10">
              <button className="bg-[#1d9bf0] py-2 px-4 text-lg font-semibold rounded-full w-full">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
