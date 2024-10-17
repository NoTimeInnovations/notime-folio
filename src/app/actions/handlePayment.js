
import CCAvenue from "@/utils/CCAvenue";
import { v4 as uuidv4 } from "uuid";

export const paymentCCAvenue = async (amount, customerName, customerEmail) => {

  const host = "http://www.notime.co.in";
  const orderId = uuidv4();

  let paymentData = {
    merchant_id: process.env.CCA_MERCHANT_ID, // Merchant ID (Required)
    order_id: orderId, // Order ID
    amount: amount, // Payment Amount (Required)
    currency: "INR", // Payment Currency Type (Required)
    language: "EN", // Language (Optional)

    billing_email: customerEmail, // Billing Email (Optional)
    billing_name: customerName, // Billing Name (Optional)
    // billing_address: "Address Details", // Billing Address (Optional)
    // billing_city: "Ahmedabad", // Billing City (Optional)
    // billing_state: "Gujarat", // Billing State (Optional)
    // billing_zip: "380002", // Billing Zip (Optional)
    // billing_country: "India", // Billing COuntry (Optional)
    // billing_tel: "1234567890" // Billing Mobile Number (Optional)

    redirect_url: `${host}/api/ccavenue-handle`, // Success URL (Required)
    cancel_url: `${host}/api/ccavenue-handle`, // Failed/Cancel Payment URL (Required)

    // merchant_param1: "Extra Information", // Extra Information (Optional)
    // merchant_param2: "Extra Information", // Extra Information (Optional)
    // merchant_param3: "Extra Information", // Extra Information (Optional)
    // merchant_param4: "Extra Information", // Extra Information (Optional)
  };

  let encReq = CCAvenue.getEncryptedOrder(paymentData);
  let accessCode = process.env.CCA_ACCESS_CODE;
  let URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}6&encRequest=${encReq}&access_code=${accessCode}`;
  return URL;
};
