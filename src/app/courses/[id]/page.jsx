
import CourseDetail from '@/pages/CourseDetail';
import React from 'react'

const page = ({ params }) => {

  return (
    <CourseDetail id={params?.id} />
  )
}

export default page