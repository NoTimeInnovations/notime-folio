"use client";
import FileUpload from '@/components/UserRegistration/FileUpload';
import Link from 'next/link'
import React, { useRef, useState } from 'react'

export default function RegistrationPage() {

    const password = useRef();
    const confirmPassword = useRef();
    const [warningMsg, setWarningMsg] = useState();
    const [confirmPasswordWarningMsg, setConfirmPasswordWarningMsg] = useState();
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [text, setText] = useState("Upload Profile Image");


    const checkPassword = () => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        // console.log(password.current.value)
        setWarningMsg('')
        if (pattern.test(password.current.value)) {
            // console.log("validated")
            setWarningMsg("strong password")
        }
        else {
            setWarningMsg("password must contain at least 8 characters, combination of uppercase, numbers & special characters.")
        }
    }

    const validatePassword = () => {
        setConfirmPasswordWarningMsg('')
        if (password.current.value === confirmPassword.current.value) {
            setConfirmPasswordWarningMsg("password matched")
            setPasswordValidation(true)
            return;
        }
        setConfirmPasswordWarningMsg("password doesn't matches")
    }

    const handelOnFormSubmit = (e) => {
        e.preventDefault();
        console.log("submitted")
        const name = e.target.name.value;
        const email = e.target.email.value;
        const profession = e.target.profession.value;
        const password = e.target.password.value;

        const userDetails = {name ,email ,profession ,password}
        console.log(userDetails)
    }

    return (

        <div className='mt-32 grid xs:grid-cols-1 xs:gap-10 lg:grid-cols-2 items-center justify-center w-3/4 mx-auto'>
            <div>
                <FileUpload setText={setText} />
                <div>
                    <h4
                        className={`text-sm text-center mt-6 ${text === "Image Uploaded"
                            ? "text-green-500"
                            : text === "Failed to Upload"
                                ? "text-red-500"
                                : "dark:text-white"
                            }`}
                    >
                        {text}
                    </h4>
                </div>
            </div>
            <div>
                <h1 className='dark:text-white text-4xl text-center mb-6'>Join, Learn, Build, Succeed!</h1>
                <form className="max-w-sm mx-auto" onSubmit={handelOnFormSubmit}>

                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="text" id="name" name='name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Rahul Kumar" required />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" name='email' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="profession" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profession</label>
                        <select id="profession" name='profession' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            <option>Students</option>
                            <option>Professionals</option>
                            <option>Freelancer</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" name='password' ref={password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={checkPassword} />
                        {/* warning message */}
                        <div>
                            <p className={`${(warningMsg == "strong password") ? "text-lime-500" : "text-red-500"} text-xs`}>{warningMsg}</p>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" id="confirm-password" ref={confirmPassword} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={validatePassword} />
                        {/* confirm password warning message */}
                        <div>
                            <p className={`${(confirmPasswordWarningMsg == "password matched") ? "text-lime-500" : "text-red-500"} text-xs`}>{confirmPasswordWarningMsg}</p>
                        </div>
                    </div>

                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                </form>

            </div>
        </div>
    )
}
