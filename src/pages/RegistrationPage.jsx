"use client";
import Alert from '@/components/common/Alert';
import FileUpload from '@/components/UserRegistration/FileUpload';
import axios from 'axios';
import Link from 'next/link'
import React, { useRef, useState } from 'react'

export default function RegistrationPage() {

    const password = useRef();
    const confirmPassword = useRef();
    const [warningMsg, setWarningMsg] = useState();
    const [confirmPasswordWarningMsg, setConfirmPasswordWarningMsg] = useState();
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [text, setText] = useState("Upload Profile Image");

    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [filePath, setFilePath] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null)



    const handelImageUpload = async (e) => {
        setText("Upload Profile Image");
        const file = e.target.files[0];
        console.log(file)
        const data = new FormData();
        data.set('profileImage', file)
        console.log(data)
        try {
            setLoading(true)
            const response = await axios.post("/api/imagePath", data)
            // console.log(response.data)
            setText("Profile Image Loaded");
            setFilePath(response.data.filePath);
            console.log(response.data.filePath)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setText("Failed To Load Image")
            console.log("Some Error Occured")
        }
    }

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

    const handelOnFormSubmit = async (e) => {
        e.preventDefault();
        setAlertMsg(null)
        if (filePath) {
            setText("Profile Image Loaded")
        }
        else {
            setText("Upload Profile Image");
        }
        const name = e.target.name.value;
        const email = e.target.email.value;
        const profession = e.target.profession.value;
        const password = e.target.password.value;

        const userDetails = { name, email, profession, password, filePath }

        // console.log(userDetails)

        //submitting user details
        try {
            setSubmit(true)
            const response = await axios.post('/api/registration', userDetails)
            setSubmit(false)
            if (response.data.profileImageUrl) {
                setText("Image Uploaded")
            }
            console.log(response.data)
        } catch (error) {
            setSubmit(false)
            setAlertMsg("Some Error Occurred : Failed to Submit the User Details")
            setText("Failed to Upload Image")
            console.log("error posting the user details")
        }
    }

    return (

        <div className='mt-32'>
            <div className='grid xs:grid-cols-1 xs:gap-10 lg:grid-cols-2 items-center justify-center w-3/4 mx-auto'>
                <div>
                    {alertMsg && <Alert msg={alertMsg} />}
                    <FileUpload setText={setText} filePath={filePath} loading={loading} handelImageUpload={handelImageUpload} setFilePath={setFilePath} />
                    <div>
                        <h4
                            className={`text-sm text-center mt-6 ${text === "Image Uploaded"
                                ? "text-green-500"
                                : (text === "Failed to Upload Image" || text === "Failed To Load Image")
                                    ? "text-red-500"
                                    : text === "Profile Image Loaded"
                                        ? "text-yellow-500"
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

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                            {submit && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>}

                            Register new account</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
