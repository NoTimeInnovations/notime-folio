"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/components/home/Button";
import GradientText from "@/components/common/GradientText";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Enter a valid email");
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
    if (validateForm()) {
      setLoading(true);
      toast.loading("Loading.....");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
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
          toast.success("Login success");
          

          Cookies.set('auth_token' , data?.token , { expires : 30 });
          Cookies.set('user' , JSON.stringify(data?.user) , { expires : 30 });
          
          // localStorage.setItem("auth_token", data?.token);
          // localStorage.setItem("user", JSON.stringify(data?.user));
          
          router.push("/dashboard");
        }
      } catch (error) {
        toast.dismiss();
        setLoading(false);
        toast.error("Failed to login user");
        console.error(error);
      }
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-gray-900">
      <motion.div
        className="max-w-sm mx-auto w-full bg-gray-800 p-8 rounded-lg shadow-lg"
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

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="............"
              className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div className="flex items-start mb-3">
            <label
              htmlFor="terms"
              className="text-[12px] font-medium text-gray-900 dark:text-gray-300"
            >
             Dont have an account?{" "}
              <Link
                href="/auth/registration"
                className="text-blue-600 hover:underline dark:text-blue-500 text-[12px] font-medium"
              >
                <GradientText>Register</GradientText>
              </Link>
            </label>
          </div>
          <Button text={'Login'} disabled={isLoading} gradient={'bg-gradient-to-r text-white from-green-500 to-yellow-500'} />

        </form>
      </motion.div>
    </div>
  );
}
