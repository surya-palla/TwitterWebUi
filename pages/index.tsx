import Image from "next/image";
import React, { useCallback, useState } from "react";
import {
  BsTwitter,
  BsBell,
  BsEnvelope,
  BsBookmark,
  BsPeople,
} from "react-icons/bs";
import { BiSolidHome, BiSearch, BiMoney, BiImageAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

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
  const { user } = useCurrentUser();

  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);
  // console.log(user);
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error(`Google token not found`);
      }
      const { verifyGoogleToken } = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );

      toast.success("verified successfully");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      }

      await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
    },
    [queryClient]
  );

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
    setContent("");
  }, [content, mutate]);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-6">
        <div className="col-span-3 pt-1 ml-28 relative">
          <div className="text-2xl h-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all w-fit">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {sideMenubarItems.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-2 w-fit cursor-pointer mt-1"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pr-10">
              <button className="bg-[#1d9bf0] py-2 px-4 text-lg font-semibold rounded-full w-full">
                Tweet
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 p-3 px-3 py-2 rounded-xl">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="UserProfile"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll no-scrollbar">
          <div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageURL && (
                    <Image
                      className="rounded-full"
                      src={user?.profileImageURL}
                      alt="userImage"
                      height={50}
                      width={50}
                    />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea
                    className="border-b border-slate-700 w-full bg-transparent text-xl px-3 focus:outline-none"
                    placeholder="What's happening?"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <BiImageAlt
                      onClick={handleSelectImage}
                      className="text-xl"
                    />
                    <button
                      onClick={handleCreateTweet}
                      className="bg-[#1d9bf0] py-2 px-4 text-sm font-semibold rounded-full"
                    >
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
        <div className="col-span-3 p-5">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="m-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
