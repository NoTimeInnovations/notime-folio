import GradientText from "@/components/common/GradientText";
import H1 from "@/components/common/H1";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RedirectButton = ({ children, link, bg }) => {
  return (
    <Link
      replace
      href={link}
      className={`font-medium text-lg ${bg} px-5 grid place-items-center max-w-[240px] py-2 rounded hover:brightness-105 transition-all`}
    >
      {children}
    </Link>
  );
};

const page = ({ searchParams }) => {
  const type = searchParams?.type;
  const imgUrl = type === "success" ? "/tick-mark.svg" : "/cross-mark.svg";
  const paymentURL = cookies().get("paymentURL")?.value;

  return (
    <section className="grid gap-5 place-content-center min-h-screen mx-[7.5%] text-white">
      <div
        className={`aspect-square w-[200px] rounded-full gird place-items-center justify-self-center ${type == "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        <Image
          src={imgUrl}
          alt={type ? "success" : "failed"}
          width={200}
          height={200}
        />
      </div>

      <H1>
        <GradientText
          gradient={
            type === "success"
              ? "bg-gradient-to-r from-green-500 to-yellow-500"
              : "bg-gradient-to-r from-red-500 to-red-900"
          }
        >
          {type === "success" ? "Payment Successful" : "Payment Failed"}
        </GradientText>
      </H1>

      {type === "success" ? (
        <div className="justify-self-center mt-5">
          <RedirectButton bg={"bg-green-700"} link={"/dashboard"}>
            Go To Dashboard
          </RedirectButton>
        </div>
      ) : (
        <div className="flex items-center gap-5 justify-self-center mt-5">
          {paymentURL && (
            <RedirectButton bg={"bg-blue-700"} link={paymentURL}>
              Retry
            </RedirectButton>
          )}
          <RedirectButton bg={"bg-red-700"} link={"/dashboard"}>
            Cancel
          </RedirectButton>
        </div>
      )}
    </section>
  );
};

export default page;
