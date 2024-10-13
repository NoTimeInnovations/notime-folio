'use client'
import axios from 'axios';
import React, { useState } from 'react'
import LoadingSpinner from '../common/LoadingSpinner';
import { RxCross1 } from "react-icons/rx";
import Image from 'next/image';

export default function FileUpload({ setText, loading, filePath, setFilePath, handelImageUpload, setAlertMsg }) {

    const handelChangeImage = () => {
        setFilePath(null)
        setAlertMsg(null)
        setText("Upload Profile Image")
    }

    return (
        <>
            {filePath ? <div className="relative aspect-square max-w-[300px] justify-center flex">
                <Image
                    src={filePath}
                    width={150}
                    height={150}
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
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-700 border-gray-600 hover:border-gray-500 ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4  text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokelinecapp="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm  text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs  text-gray-400"> PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" name='profileImage' onChange={handelImageUpload} />
                        </label>
                    </div>}
        </>
    )
}
