import React from "react";
import { LuMonitorPlay } from "react-icons/lu";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { SiOpentelemetry } from "react-icons/si";
import { TbMessageChatbotFilled } from "react-icons/tb";

function Reasons() {
  const reasons = [
    {
      title: "Enjoy on your TV",
      detail:
        " Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
      icon: <LuMonitorPlay />,
    },
    {
      title: "Download your shows to watch offline",
      detail:
        "Save your favourites easily and always have something to watch.",
      icon: <FaCloudDownloadAlt />,
    },
    {
      title: "Watch everywhere",
      detail:
        "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
      icon: <SiOpentelemetry />,
    },
    {
      title: "Create profiles for kids",
      detail:
        " Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
      icon: <TbMessageChatbotFilled />,
    },
  ];

  return (
    <div className="mt-5 md:mt-8 lg:mt-10 px-4 md:px-8 lg:px-12">
      <div className="font-bold text-xl md:text-2xl lg:text-3xl mb-5 md:mb-6 lg:mb-8">
        More reasons to join
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {reasons.map((reason, index) => {
          return (
            <div 
              key={index} 
              className="w-full h-64 sm:h-72 md:h-80 lg:h-[320px] rounded-2xl p-4 md:p-5 bg-gradient-to-b from-blue-950 to-gray-900 relative flex flex-col"
            >
              <div className="font-bold text-lg md:text-xl lg:text-[22px] mb-3 md:mb-4">
                {reason.title}
              </div>
              <div className="text-gray-400 text-sm md:text-base lg:text-[16px] flex-1">
                {reason.detail}
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl absolute right-4 md:right-6 lg:right-10 bottom-4 md:bottom-5 lg:bottom-5 opacity-60">
                {reason.icon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reasons;