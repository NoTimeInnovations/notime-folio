import React from "react";

const Stats = ({ userData }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-6 w-6 transition-all duration-300 ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-500'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
      <h2 className="text-3xl font-extrabold mb-6 text-white text-center">User Stats</h2>
      <div className="space-y-5">
        {/* Questions Solved */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
            <span className="text-lg text-gray-300">Questions Solved</span>
          </div>
          <span className="text-2xl font-semibold text-white">{userData.questionsSolved}</span>
        </div>

        {/* Projects Submitted */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-indigo-500 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v16m7.5-7.5h-15"
              />
            </svg>
            <span className="text-lg text-gray-300">Projects Submitted</span>
          </div>
          <span className="text-2xl font-semibold text-white">{userData.projectsSubmitted}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-yellow-500 h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.771a1 1 0 00.95.69h3.964c.969 0 1.371 1.24.588 1.81l-3.207 2.364a1 1 0 00-.364 1.118l1.23 3.772c.3.921-.755 1.688-1.54 1.118l-3.207-2.364a1 1 0 00-1.176 0l-3.207 2.364c-.784.57-1.839-.197-1.54-1.118l1.23-3.772a1 1 0 00-.364-1.118L2.317 9.198c-.784-.57-.38-1.81.588-1.81h3.964a1 1 0 00.95-.69l1.23-3.771z" />
            </svg>
            <span className="text-lg text-gray-300">Rating</span>
          </div>
          <div className="flex items-center">{renderStars(userData.rating)}</div>
        </div>

        {/* Leaderboard Rank */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-indigo-500 h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 11-7.071 2.929A9.947 9.947 0 0112 2zm0 4a1 1 0 100 2 1 1 0 000-2zm1 12.931V18.5a1 1 0 00-2 0v.431a8.038 8.038 0 01-4.463-2.488l.305-.305a1 1 0 00-.708-1.707l-1.287.094A8.038 8.038 0 0112 4.069a8.038 8.038 0 016.153 11.542l-1.287-.094a1 1 0 00-.708 1.707l.305.305A8.038 8.038 0 0113 18.931z" />
            </svg>
            <span className="text-lg text-gray-300">Leaderboard Rank</span>
          </div>
          <span className="text-2xl font-semibold text-white">#{userData.leaderboardRank}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
