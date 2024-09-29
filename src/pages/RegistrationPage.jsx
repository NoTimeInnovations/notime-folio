"use client";
import H1 from "@/components/common/H1";
import P from "@/components/common/P";
import React, { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/home/Button";
import toast from "react-hot-toast";
import Link from "next/link";
import GradientText from "@/components/common/GradientText";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const inputFields = [
    { id: "name", name: "name", placeholder: "Name", type: "text" },
    { id: "email", name: "email", placeholder: "Email", type: "email" },
    { id: "phone", name: "phone", placeholder: "Phone", type: "text" },
    {
      id: "password",
      name: "password",
      placeholder: "Password",
      type: "password",
    },
  ];

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
    if (validateForm()) {
      setLoading(true);
      toast.loading("Loading.....");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users`,
          {
            method: "post",
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
          toast.success("Registration complete");
          router.push('/login');
        }
        console.log(data);
      } catch (error) {
        toast.dismiss();
        setLoading(false);
        toast.error("Failed to register user");
        console.error(error);
      }
    }
  };

  return (
    <main className="pt-[120px] px-[8%] lg:pt-[8%] grid place-items-center min-h-screen">
      <form className="bg-black/50 py-12 px-10 rounded-md shadow-2xl">
        <H1>Registration</H1>
        <P>Get started on your coding journey</P>

        {/* inputs */}
        <div className="max-w-[500px] grid gap-5 mt-10">
          {inputFields.map((field) => (
            <Input
              key={field.id}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              value={form[field.name]}
              onChange={(e) =>
                setForm({ ...form, [field.name]: e.target.value })
              }
            />
          ))}
        </div>
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          text={"Register"}
          gradient={
            "bg-gradient-to-r text-white mt-5 from-green-500 to-yellow-500"
          }
        />

        <div className="flex justify-center mt-5 text-sm text-white/70">
          <p>
            Already have an account?{" "}
            <Link href={"/login"}>
              <GradientText className={'font-medium text-base'}>Login</GradientText>
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default RegistrationPage;
