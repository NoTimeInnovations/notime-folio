"use client";
import { useState } from "react";
import handlePayment from "../actions/payment";

export default function Payment() {
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState("");

  const handlePayNow = async () => {
    await handlePayment(amount, orderId);
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="mt-[120px] grid gap-5 max-w-[500px] my-auto mx-auto ">
        <input
          type="text"
          placeholder="Order ID"
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="text-white bg-green-500 py-2 px-5 "
          onClick={handlePayNow}
        >
          Pay Now
        </button>
      </div>
    </main>
  );
}
