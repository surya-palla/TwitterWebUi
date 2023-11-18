import Image from "next/image";
import React from "react";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Image
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/42321193?v=4"
            alt="userImage"
            height={50}
            width={50}
          />
        </div>
        <div className="col-span-11">
          <h5>Surya Palla</h5>
          <p>
            The only difference between the visual skyline of Gaza city and
            Hyderabad city tonight , is that there it’s real bombs and here it’s
            Diwali bombs 😳
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
