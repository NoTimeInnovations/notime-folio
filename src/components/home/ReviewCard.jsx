import React from "react";

const ReviewCard = ({ image, name, position, review }) => {

  return (
    <div className=" flex justify-center py-5 px-6 cursor-pointer">
      <div className="py-12 xl:py-16 pt-16 xl:pt-20 relative w-[350px] xl:w-[450px]">
        {/* person  */}
        <div className="flex items-center absolute top-5 -left-5 xl:top-5 w-full">
          {/* profile photo */}
          <div className="w-20 xl:w-24 aspect-square overflow-hidden rounded-lg">
            <img
              src={image}
              alt="profile"
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* name and postion  */}
          <div className="h-min w-1/2 grid gap-1 bg-[#1f2732] py-2 px-5 rounded">
            <h1 className="font-bold text-sm xl:text-xl">{name}</h1>
            <div className="text-xs opacity-70 xl:text-sm">{position}</div>
          </div>
        </div>

        {/* review  */}
        <div className="bg-[#151a21] px-5 py-12 text-sm rounded shadow-xl shadow-[#252b33] xl:text-lg">
          {review}
        </div>

        {/* quote svg  */}
        <div className="absolute bottom-4 left-5">
          <svg
            className="text-[#373e47] w-16 h-16 rotate-180"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              className="fill-current"
              stroke="none"
            >
              <path
                d="M1135 4249 c-470 -59 -860 -420 -955 -887 -25 -123 -27 -322 -5 -439
40 -212 141 -407 289 -562 149 -154 298 -244 506 -304 l80 -23 -74 -150 c-104
-209 -234 -403 -391 -584 -64 -74 -85 -122 -85 -196 0 -119 72 -210 187 -235
65 -15 114 -5 280 56 722 268 1204 816 1377 1566 54 237 79 601 53 774 -39
251 -145 468 -314 645 -104 110 -187 171 -318 235 -203 99 -402 132 -630 104z"
              />
              <path
                d="M3692 4250 c-633 -89 -1063 -662 -967 -1290 65 -428 385 -792 794
-901 44 -12 81 -25 81 -28 0 -3 -29 -65 -64 -138 -98 -202 -219 -384 -389
-587 -77 -93 -102 -154 -94 -227 15 -127 110 -212 237 -213 166 -1 615 213
865 412 519 413 805 1050 805 1790 0 196 -21 316 -81 466 -172 430 -554 706
-999 721 -69 2 -153 0 -188 -5z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
