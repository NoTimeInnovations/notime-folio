import React from "react";

const Stats = ({ userData }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-400'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      );
    }
    return stars;
  };
  return (
    <div className='ml-3 p-5 bg-gray-800 rounded-lg shadow-md'>
      <h2 className="text-2xl font-bold mb-4">User Stats</h2>
      <p className="flex items-center">
        Questions Solved: <span className="ml-2 text-lg">{userData.questionsSolved}</span>
      </p>
      <p className="flex items-center">
        Projects Submitted: <span className="ml-2 text-lg">{userData.projectsSubmitted}</span>
      </p>
      <p className="flex items-center">
        Rating:
        <span className="ml-2 flex items-center">
          {renderStars(userData.rating)}
        </span>
      </p>
      <p className="flex items-center">
        Leaderboard Rank: <span className="ml-2 text-lg">{userData.leaderboardRank}</span>
      </p>
    </div>
  );
}

export default Stats;