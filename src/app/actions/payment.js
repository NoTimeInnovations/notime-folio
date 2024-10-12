"use server";
import cryptoJs from "crypto-js";
import { redirect } from "next/navigation";

const handlePayment = async (amount, orderId) => {
  const redirectUrl = "http://localhost:3000/dashboard";
  const cancelUrl = "http://localhost:3000";

  const merchantId = process.env.CCA_MERCHANT_ID;
  const accessCode = process.env.CCA_ACCESS_CODE;
  const encryptionKey = process.env.CCA_ENCRYPTION_KEY;

  // Prepare the request data
  const requestParams = {
    merchant_id: merchantId,
    order_id: orderId,
    amount: amount,
    currency: "INR",
    redirect_url: redirectUrl,
    cancel_url: cancelUrl,
    language: "EN",
  };

  // Convert requestParams to query string
  const queryString = new URLSearchParams(requestParams).toString();

  // Encrypt the request
  const encryptedRequest = cryptoJs.AES.encrypt(
    queryString,
    encryptionKey
  ).toString();

  // Send the request to CCAvenue
  const paymentUrl =
    "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

  redirect(
    `${paymentUrl}&encRequest=${encryptedRequest}&access_code=${accessCode}`
  );
};

export default handlePayment;
