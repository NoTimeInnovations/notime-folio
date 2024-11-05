'use client'; // Mark this as a client component

import UserPage from '@/mainPages/user';
import { useParams } from 'next/navigation'; // Use useParams from next/navigation for app router

const page = () => {
  const params = useParams(); // Get dynamic route parameters

  return (
    <div>
      <UserPage id={params.id} auth={true} />
    </div>
  );
};

export default page;
