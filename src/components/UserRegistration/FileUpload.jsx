'use client'
import axios from 'axios';
import React, { useState } from 'react'
import LoadingSpinner from '../common/LoadingSpinner';
import { RxCross1 } from "react-icons/rx";

export default function FileUpload({ setText, loading, filePath, setFilePath, handelImageUpload, setAlertMsg }) {

    const handelChangeImage = () => {
        setFilePath(null)
        setAlertMsg(null)
        setText("Upload Profile Image")
    }

    return (
        <>
            {filePath ? <div className="relative w-full h-full">
                <img
                    src={`http://localhost:3000/${filePath}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
                <button
                    className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 hover:bg-gray-200 focus:outline-none flex items-center justify-center"

                >
                    <RxCross1 onClick={handelChangeImage} />
                </button>
            </div>
                : loading ? <LoadingSpinner /> :
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokelinecapp="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" name='profileImage' onChange={handelImageUpload} />
                        </label>
                    </div>}
        </>
    )
}
