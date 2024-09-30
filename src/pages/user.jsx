import Badges from '@/components/user/Badges';
import Info from '@/components/user/Info';
import PaymentHistory from '@/components/user/PaymentHistory';
import Project from '@/components/user/Poject';
import { useState } from 'react';

const UserProfile = () => {  //props = auth , id
  const auth = true;
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe',
    imageUrl: 'https://picsum.photos/id/237/100/100',
    questionsSolved: 120,
    projectsSubmitted: 8,
    rating: 3,
    leaderboardRank: 10,
    badges: [
      { id: 1, title: 'Top Solver', icon: '🏆' },
      { id: 2, title: 'Fast Learner', icon: '⚡' },
    ],
    paymentHistory: [
      { course: 'React Mastery', amount: '$199', date: '2023-04-10' },
      { course: 'Next.js Pro', amount: '$299', date: '2023-06-12' },
    ],
    projects: [
      {
        title: 'Portfolio Website',
        gitLink: 'github.com/johndoe/portfolio',
        liveLink: 'portfolio.johndoe.com',
        imageUrl:
          'https://picsum.photos/seed/picsum/200/300', // Sample image
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 mt-20 px-5 md:px-10 lg:px-16 xl:px-[15%]">
       {/* Info */}
      <Info auth={auth} userData={userData} setUserData={setUserData}></Info>

      {/* Badges */}
      <Badges userData={userData}/>


      {/* Payment History */}
      {auth ? (<PaymentHistory userData={userData} />
      ) : <></>}

      {/* Projects */}
      <Project userData={userData} auth={auth} setUserData={setUserData} />
    </div>
  );
};

export default UserProfile;
