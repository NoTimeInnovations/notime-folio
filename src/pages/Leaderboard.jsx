import React from "react";

const users = [
    { id: 1, name: "Jackson", score: 1847, username: "@username", position: 2, color: "#009bd6", avatar: "https://via.placeholder.com/68x68" },
    { id: 2, name: "Eiden", score: 2430, username: "@username", position: 1, color: "#ffaa00", avatar: "https://via.placeholder.com/68x68" },
    { id: 3, name: "Emma Aria", score: 1674, username: "@username", position: 3, color: "#00d95f", avatar: "https://via.placeholder.com/68x68" },
    { id: 4, name: "Sebastian", score: 1124, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'up' },
    { id: 5, name: "Jason", score: 875, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'down' },
    { id: 6, name: "Natalie", score: 774, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'up' },
    { id: 7, name: "Serenity", score: 723, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'up' },
    { id: 8, name: "Hannah", score: 559, username: "@username", avatar: "https://via.placeholder.com/50x50", change: 'neutral' },
];

const TopUserCard = ({ user, isFirst }) => (
    <div className={`relative flex flex-col items-center ${isFirst ? "mb-[100px] w-[7rem] rounded-3xl scale-110 bg-[#1e2237]" : ""}`}>
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
    <div className="flex items-center justify-between p-4 border-b border-[#5e5959]/50">
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

const Dashboard = () => {
    return (
        <div className="min-w-[390px] min-h-[844px] relative bg-[#151729]">
            {/* Header */}
            <div className="w-[35px] h-[35px] left-[14px] top-[20px] absolute"></div>
            <div className="left-[133px] top-[28px] absolute text-white text-xl font-semibold">Leaderboard</div>

            {/* Tabs */}
            <div className="w-[342px] h-[50px] left-[24px] top-[95px] absolute bg-[#1e2237] rounded-xl"></div>
            <div className="absolute left-[48px] top-[111px] text-white text-[15px] font-medium">Region</div>
            <div className="absolute left-[165px] top-[111px] text-white text-[15px] font-medium">National</div>
            <div className="absolute left-[292px] top-[111px] text-white text-[15px] font-medium">Global</div>
            <div className="w-[45px] h-[3px] left-[48px] top-[142px] absolute bg-[#699bf7] rounded-[10px]"></div>

            {/* Top 3 Users */}
            <div className="w-[342px] h-[113px] left-[27px] top-[293px] absolute bg-[#1e2237] rounded-xl flex justify-around items-center">
                {users.slice(0, 3).map((user, index) => (
                    <TopUserCard key={user.id} user={user} isFirst={index === 1} />
                ))}
            </div>

            {/* Other Users */}
            <div className="w-[390px] h-[410px] left-0 top-[434px] absolute bg-[#1e2237] rounded-tl-[40px] rounded-tr-[40px] overflow-hidden">
                {users.slice(3).map((user, index) => (
                    <OtherUserCard key={user.id} user={user} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;