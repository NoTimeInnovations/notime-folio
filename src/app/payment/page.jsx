"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { handlePayment } from "../actions/payment";

export default function Payment() {
  const [am, setAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const router = useRouter();

  // const handleEncrypt = async () => {
  //   const merchantId = process.env.CCA_MERCHANT_ID;
  //   const oId = orderId;
  //   const currency = "INR";
  //   const amount = parseFloat(am).toFixed(2);
  //   const redirectUrl = "http://notime.co.in";
  //   const cancelUrl = "http://notime.co.in";
  //   const integrationType = "iframe_normal";
  //   const language = "EN";

  //   const params = {
  //     merchant_id: merchantId,
  //     order_id: oId,
  //     currency,
  //     amount,
  //     redirect_url: redirectUrl,
  //     cancel_url: cancelUrl,
  //     integration_type: integrationType,
  //     language,
  //   };

  //   const queryString = Object.entries(params)
  //     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  //     .join("&");

  //   // Use your predefined encryption key directly
  //   const encryptionKey = process.env.CCA_ENCRYPTION_KEY; // Make sure this is a 32-byte key for AES-256

  //   try {
  //     // Encrypt the query string
  //     const encryptedRequest = CryptoJS.AES.encrypt(queryString, encryptionKey).toString();

  //     const payURL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&access_code=${process.env.CCA_ACCESS_CODE}&encRequest=${encryptedRequest}&Merchant_Id=${merchantId}`;
  //     console.log(payURL);

  //     setPaymentUrl(payURL);
  //   } catch (error) {
  //     console.error("Encryption or URL construction error: ", error);
  //   }
  // };

  const handlePayNow = async () => {
    const redirect = await handlePayment(am, orderId);
    setPaymentUrl(redirect?.redirectUrl);
  };

  // useEffect(() => {
  //   const handleIframeLoad = (e) => {
  //     if (e.data && e.data.newHeight) {
  //       const paymentFrame = document.getElementById("paymentFrame");
  //       if (paymentFrame) {
  //         paymentFrame.style.height = `${e.data.newHeight}px`;
  //       }
  //     }
  //   };

  //   window.addEventListener("message", handleIframeLoad, false);
  //   return () => {
  //     window.removeEventListener("message", handleIframeLoad);
  //   };
  // }, []);

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="mt-[120px] grid gap-5 max-w-[500px] my-auto mx-auto">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={am}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="text-white bg-green-500 py-2 px-5"
          onClick={handlePayNow}
        >
          Pay Now
        </button>
      </div>

      <div id="paymentDiv">
        {paymentUrl && (
          <iframe
            width="482"
            height="500"
            scrolling="No"
            frameBorder="0"
            id="paymentFrame"
            src={paymentUrl}
          ></iframe>
        )}
      </div>
    </main>
  );
}
