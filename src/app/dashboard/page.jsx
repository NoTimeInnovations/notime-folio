"use client"
import Banner from '@/components/common/Banner'
import Courses from '@/pages/Courses'
import Leaderboard from '@/pages/Leaderboard'
import React from 'react'

export default function page() {
    return (
        <div className='mt-12 py-20 mx-20'>
            <Banner text="Courses" />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-14 justify-center'>

                <div className='flex justify-center lg:order-last'>
                    <Leaderboard />
                </div>
                <div className='lg:col-span-2'>
                    <Courses />
                </div>
                
            </div>
        </div>
    )
}
