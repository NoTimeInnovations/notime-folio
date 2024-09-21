"use client"
import Courses from '@/pages/Courses'
import Dashboard from '@/pages/Leaderboard'
import React from 'react'

export default function page() {
    return (
        <div className='mt-12 py-20 mx-20 grid grid-cols-1 lg:grid-cols-3 gap-12 justify-center'>
            <div className='flex justify-center'>
                <Dashboard />
            </div>
            <div className='col-span-2'>
                <Courses/>
            </div>
        </div>
    )
}
