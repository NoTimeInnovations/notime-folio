import { useState } from 'react';
import { motion } from 'framer-motion';

const RankCard = ({ user }) => {
    const [showAllBadges, setShowAllBadges] = useState(false);

    // Toggle showing all badges
    const toggleBadges = () => setShowAllBadges(!showAllBadges);

    const displayedBadges = showAllBadges ? user.badges : user.badges.slice(0, 5);

    return (
        <div className="p-4 rounded-xl shadow-md w-full mb-12">
            {/* User Info */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 bg-primary text-white font-bold rounded-full flex items-center justify-center"/>
                    <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.username}</div>
                    </div>
                </div>
            </div>

            {/* Rank Info */}
            <motion.div
                className="mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-gray-600 dark:text-gray-300">Current rank: <span className="font-semibold">{user.currentRank}</span></div>
                <div className="text-gray-600 dark:text-gray-300">Next rank: <span className="font-semibold">{user.nextRank}</span></div>
            </motion.div>

            {/* Level Up Circle (with circular progress bar) */}
            <motion.div
                className="relative flex items-center justify-center my-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <svg className="w-[17rem] h-[17rem]" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" stroke="#e0e0e0" strokeWidth="5" fill="none" />
                    {/* Progress circle */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#ffc107" // Golden-yellow color for progress
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray="282"  // Circumference of the circle
                        strokeDashoffset={282 * (1 - user.progress)} // Dynamic progress
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 282 }}
                        animate={{ strokeDashoffset: 282 * (1 - user.progress) }}
                        transition={{ duration: 1 }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center ">
                    <div className="text-6xl font-bold text-primary text-[#ffc107] mb-8">{user.level}</div>
                    <div className="text-sm text-green-400 dark:text-green-300">{user.xp} xp to level up!</div>
                </div>
            </motion.div>

            {/* Message */}
            <motion.div
                className="text-center text-gray-600 dark:text-gray-400 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Reach the next rank and become a powerful user!
            </motion.div>

            {/* Badges Section */}
            <motion.div
                className="space-y-2"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">Badges</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer" onClick={toggleBadges}>
                    {showAllBadges ? 'View less' : 'View all'}
                </div>

                {/* Badge List */}
                <div className="flex flex-wrap items-center space-x-2">
                    {displayedBadges.map((badge, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center space-x-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <img src={badge.icon} alt={badge.name} className="w-14 h-14 rounded-full" />
                            {/* <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{badge.name}</div> */}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default RankCard;
