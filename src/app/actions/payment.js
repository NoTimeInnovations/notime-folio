"use server";
import CCAvenue from '@/utils/CCAvenue';


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

    console.log("Query string:", queryString);

    // Generate a random initialization vector (IV) of 32 bytes
    const iv = "encryptionIntVec"

    console.log("Initialization vector:", iv.toString("hex"));
    

    // Create cipher instance with AES-128-CBC
    const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);

    // Encrypt the query string
    let encryptedRequest = cipher.update(queryString, "utf8", "hex");
    encryptedRequest += cipher.final("hex");

    // Combine IV with the encrypted request
    const ivHex = iv.toString('hex');
    const finalEncryptedRequest = `${encryptedRequest}`;

    console.log("Encrypted request:", finalEncryptedRequest);

    // Redirect to CCAvenue with the encrypted request
    return {
      redirectUrl: `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${finalEncryptedRequest}&access_code=${accessCode}&Merchant_Id=${merchantId}`,
    };
  } catch (error) {
    console.error("Payment initiation failed:", error);
    throw error; // Optionally rethrow the error for further handling
  }
}
