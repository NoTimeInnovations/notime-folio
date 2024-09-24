"use client"
import RankCard from "@/components/dashboard/RankCard";
import React, { useEffect, useState } from "react";

const users = [
    { id: 1, name: "Jackson", score: 1847, username: "@username", position: 2, color: "#009bd6", avatar: "https://via.placeholder.com/68x68" },
    { id: 2, name: "Eiden", score: 2430, username: "@username", position: 1, color: "#ffaa00", avatar: "https://via.placeholder.com/68x68" },
    { id: 3, name: "Emma Aria", score: 1674, username: "@username", position: 3, color: "#00d95f", avatar: "https://via.placeholder.com/68x68" },
    { id: 4, name: "Sebastian", score: 1124, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'up' },
    { id: 5, name: "Jason", score: 875, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'down' },
    { id: 6, name: "Natalie", score: 774, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'up' },
    { id: 7, name: "Serenity", score: 723, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'up' },
    { id: 8, name: "Hannah", score: 559, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'neutral' },
    { id: 9, name: "Hannah", score: 559, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'neutral' },
    { id: 10, name: "Hannah", score: 559, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'neutral' },
    { id: 11, name: "Hannah", score: 559, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'neutral' },
    { id: 12, name: "Hannah", score: 559, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'neutral' },
    { id: 13, name: "Hannah", score: 559, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'neutral' },
];

const loggedInUser = {
    id: 14,
    name: "Anish",
    score: 1847,
    username: "@username",
    position: 2,
    color: "#009bd6",
    avatar: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
    currentRank: 'Master',
    nextRank: 'Grandmaster',
    level: 3,
    progress: 0.75,
    xp: '7.49k',
    badges: [
        { name: 'Get Started', icon: 'https://camo.githubusercontent.com/4dfb47156ff3834e2484293ccd58a014946a7ccd44a96e24e4a3569a4d8f0c8d/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f696d616765732f6d6f64756c65732f70726f66696c652f616368696576656d656e74732f7374617273747275636b2d64656661756c742e706e67' },
        { name: 'Get Started', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHxOWhmjvO__flk1qPkyDtq3f_cvhItxveu3Zp-AYlRZjru4q77kKZxsiNpYhvryOhmJ4&usqp=CAU' },
        { name: 'Get Started', icon: 'https://camo.githubusercontent.com/fef465fc134949d482729380e3314faaf2b74b79ad842d59733edbaabf2dc62b/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f696d616765732f6d6f64756c65732f70726f66696c652f616368696576656d656e74732f70756c6c2d736861726b2d676f6c642e706e67' },
        { name: 'Get Started', icon: 'https://camo.githubusercontent.com/3db47333ae1a8a4ba53720373a422abfda5de478ab919353b04360db4560d81a/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f696d616765732f6d6f64756c65732f70726f66696c652f616368696576656d656e74732f6f70656e2d736f757263657265722d64656661756c742e706e67' },
        { name: 'Get Started', icon: 'https://github.githubassets.com/images/modules/profile/achievements/heart-on-your-sleeve-default.png' },
        { name: 'Get Started', icon: 'https://github.githubassets.com/images/modules/profile/achievements/heart-on-your-sleeve-default.png' },
    ],
}


const TopUserCard = ({ user, isFirst }) => (
    <div className={`relative flex flex-col items-center cursor-pointer hover:scale-105 transition-all ${isFirst ? "mb-[100px] w-[7rem] rounded-3xl scale-110" : ""}`}>
        <div
            className="w-[68px] h-[68px] rounded-full border-4"
            style={{
                borderColor: user.color,
                backgroundImage: `url(${user.avatar})`,
                backgroundSize: 'cover',
                width: isFirst ? "80px" : "68px",
                height: isFirst ? "80px" : "68px",
            }}
        ></div>
        {isFirst && <div className="absolute -top-6 text-[#ffaa00] text-2xl">👑</div>}
        <div className="text-white text-xs font-medium">{user.name}</div>
        <div className="text-[#b6b3b3] text-[8px] font-light">{user.username}</div>
        <div className="text-[15px] font-bold" style={{ color: user.color, fontSize: isFirst ? "20px" : "15px" }}>
            {user.score}
        </div>
    </div>
);

const OtherUserCard = ({ user, index }) => (
    <div className="flex items-center justify-between p-4 border-b border-[#5e5959]/50 hover:bg-blue-500 hover:scale-110 cursor-pointer transition-all">
        <div className="flex items-center space-x-4">
            <img src={user.avatar} alt={user.name} className="w-[50px] h-[50px] rounded-full" />
            <div>
                <div className="text-white text-xs font-medium">{user.name}</div>
                <div className="text-[#b6b3b3] text-[8px] font-light">{user.username}</div>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <div className="text-white text-xs font-bold">{user.score}</div>
            {user.change === 'up' && <span className="text-green-500">▲</span>}
            {user.change === 'down' && <span className="text-red-500">▼</span>}
            {user.change === 'neutral' && <span className="text-gray-500">●</span>}
        </div>
    </div>
);

const Leaderboard = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [underline, setSetUndeline] = useState('Region');

    const handelOnclickTab = (target) => {
        setSetUndeline(target);
    }

    useEffect(() => {

        if (window.innerWidth >= 1024) {
            setIsOpen(true)
        }

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(true)
                return
            }
            setIsOpen(false)
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>

            <div id="accordion-color" data-accordion="collapse" data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white" className="w-auto xs:min-w-[390px] sm:min-w-[590px] md:min-w-[740px] lg:min-w-[390px] mt-20">
                <h2 id="accordion-color-heading-1">
                    <button
                        type="button"
                        className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3 ${isOpen ? 'border-b-0 rounded-t-xl' : 'rounded-xl'}`}
                        onClick={toggleAccordion}
                        aria-expanded={isOpen}
                        aria-controls="accordion-color-body-1"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <img src={loggedInUser.avatar} alt={loggedInUser.name} className="w-[30px] h-[30px] rounded-full" />
                            <div>{loggedInUser.name}</div>
                            <div className="grow"></div>

                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-bold text-[#ffaa00]">{loggedInUser.score}</div>
                                {loggedInUser.change === 'up' && <span className="text-green-500">▲</span>}
                                {loggedInUser.change === 'down' && <span className="text-red-500">▼</span>}
                                {loggedInUser.change === 'neutral' && <span className="text-gray-500">●</span>}
                            </div>
                        </div>

                        <svg
                            data-accordion-icon
                            className={`w-3 h-3 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div id="accordion-color-body-1" className={`${isOpen ? "block" : "hidden"}`} aria-labelledby="accordion-color-heading-1">
                    <div className="p-5 border border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center">


                        {/* rank card start */}
                        <RankCard user={loggedInUser} />
                        {/* rank card end */}


                        {/* leaderboard */}
                        <div className="w-full min-h-[844px] relative flex flex-col items-center">
                            <div className="relative w-full md:w-3/4 lg:w-full">
                                {/* Header */}
                                <div className="text-center text-white text-xl font-semibold">Leaderboard</div>

                                {/* Tabs */}
                                <div className="flex justify-center space-x-10 mt-5 relative">
                                    <div className={`text-white text-[15px] font-medium cursor-pointer hover:text-blue-500 ${underline == 'Region' && 'text-blue-500 underline underline-offset-8'}`} onClick={() => handelOnclickTab('Region')}>Region</div>
                                    <div className={`text-white text-[15px] font-medium cursor-pointer hover:text-blue-500 ${underline == 'National' && 'text-blue-500 underline underline-offset-8'}`} onClick={() => handelOnclickTab('National')}>National</div>
                                    <div className={`text-white text-[15px] font-medium cursor-pointer hover:text-blue-500 ${underline == 'Global' && 'text-blue-500 underline underline-offset-8'}`} onClick={() => handelOnclickTab('Global')}>Global</div>
                                </div>

                                {/* Top 3 Users */}
                                <div className="flex justify-around items-center w-full h-[113px] mt-[150px]">
                                    {users.slice(0, 3).map((user, index) => (
                                        <TopUserCard key={user.id} user={user} isFirst={index === 1} />
                                    ))}
                                </div>

                                {/* Other Users */}
                                <div className="w-full h-[410px] mt-20 rounded-tl-[40px] rounded-tr-[40px] overflow-y-auto">
                                    {users.slice(3).map((user, index) => (
                                        <OtherUserCard key={user.id} user={user} index={index} />
                                    ))}
                                </div>
                            </div>
                        </div>





                    </div>
                </div>
            </div>


        </>
    );
};

export default Leaderboard;