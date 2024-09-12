"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function LoginPage() {
    return (
        <div className='h-[100vh] flex items-center justify-center bg-gray-900'>
            <motion.div 
                className='max-w-sm mx-auto w-full bg-gray-800 p-8 rounded-lg shadow-lg'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            >
                <motion.h1 
                    className="text-3xl font-bold mb-6 text-center text-white"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Welcome Back!
                </motion.h1>
                
                <form>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Your email</label>
                        <input type="email" id="email" className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Your password</label>
                        <input type="password" id="password" className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-500" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-300">Remember me</label>
                    </div>
                    <motion.button 
                        type="submit" 
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        Login
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}
