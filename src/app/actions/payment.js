"use server";
import crypto from "crypto";

export async function handlePayment(amount, orderId) {
  try {
    const redirectUrl = "/";
    const cancelUrl = "/";
    const merchantId = process.env.CCA_MERCHANT_ID;
    const accessCode = process.env.CCA_ACCESS_CODE;
    const encryptionKey = process.env.CCA_ENCRYPTION_KEY;

    if (
      !merchantId ||
      !accessCode ||
      !encryptionKey ||
      !redirectUrl ||
      !cancelUrl
    ) {
      throw new Error("Missing environment variables");
    }

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

    // Encrypt the request using Node.js built-in crypto module
    const cipher = crypto.createCipheriv("aes-256-ecb", encryptionKey, null);
    let encryptedRequest = cipher.update(queryString, "utf8", "hex");
    encryptedRequest += cipher.final("hex");

    // CCAvenue payment URL
    const paymentUrl =
      "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

    // Redirect to CCAvenue with the encrypted request
    return {
      redirectUrl: `${paymentUrl}&encRequest=${encodeURIComponent(encryptedRequest)}&access_code=${accessCode}`,
    };
  } catch (error) {
    console.error("Payment initiation failed:", error);
  }
}
