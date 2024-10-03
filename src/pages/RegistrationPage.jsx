"use client";
import FileUpload from "@/components/UserRegistration/FileUpload";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/home/Button";
import GradientText from "@/components/common/GradientText";

export default function RegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profession: "student",
    role: "student",
  });
  const [text, setText] = useState("Upload Profile Image");
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleImageUpload = async (e) => {
    setText("Upload Profile Image");
    setAlertMsg(null);
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    // Check file type (allowing jpeg, png)
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file (jpeg/png)");
      return;
    }

    // Optional: Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Convert file to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      setAlertMsg("File converted to Base64 successfully");

      setFilePath(base64String);
    };

    setFile(file);

    reader.onerror = () => {
      toast.error("An error occurred while converting the file");
    };
  };

  const handleImageUploadToServer = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media`,
        {
          method: "post",
          body: formData,
        }
      );

      const data = await response.json();

      if (data?.errors) {
        toast.dismiss();
        if (data?.errors[0]?.data?.errors[0]) {
          toast.error(data?.errors[0]?.data?.errors[0]?.message);
        } else {
          toast.error(data?.errors[0]?.message);
        }
      } else {
        console.log(data?.doc.id);
        
        return data?.doc.id;
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to upload image!");
      console.error(error);
    }
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Enter a valid email");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.error("Enter a valid phone number");
      return false;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && file) {
      setLoading(true);
      toast.loading("Loading.....");

      try {
         
       const imageId = await handleImageUploadToServer();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form, image: imageId }),
          }
        );

        const data = await response.json();
        toast.dismiss();
        setLoading(false);

        if (data?.errors) {
          if (data?.errors[0]?.data?.errors[0]) {
            toast.error(data?.errors[0]?.data?.errors[0]?.message);
          } else {
            toast.error(data?.errors[0]?.message);
          }
        } else {
          toast.success("Registration complete");
          router.push("/auth/login");
        }
      } catch (error) {
        toast.dismiss();
        setLoading(false);
        toast.error("Failed to register user");
        console.error(error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-32">
      <div className="grid xs:grid-cols-1 xs:gap-10 lg:grid-cols-2 items-center justify-center w-3/4 mx-auto">
        <div className="grid place-items-center">
          <FileUpload
            setText={setText}
            filePath={filePath}
            loading={loading}
            handelImageUpload={handleImageUpload}
            setFilePath={setFilePath}
            setAlertMsg={setAlertMsg}
          />
          <div>
            <h4
              className={`text-sm text-center mt-6 ${
                text === "Profile Image Loaded"
                  ? "text-green-500"
                  : text === "Failed To Load Image"
                    ? "text-red-500"
                    : "dark:text-white"
              }`}
            >
              {text}
            </h4>
          </div>
        </div>

        <div>
          <h1 className="dark:text-white text-4xl text-center mb-6">
            Join, Learn, Build, Succeed!
          </h1>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Rahul Kumar"
                value={form.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="1234567890"
                value={form.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="profession"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Profession
              </label>
              <select
                id="profession"
                name="profession"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="••••••••"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>

            <Button
              text={"Register"}
              disabled={loading}
              gradient={
                "bg-gradient-to-r text-white from-green-500 to-yellow-500"
              }
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 "
              >
                <GradientText>Login here</GradientText>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
