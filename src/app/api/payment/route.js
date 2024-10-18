import CCAvenue from "@/utils/CCAvenue";

export async function POST(req) {

  try {
    // Decrypt the Response Data from Request Body
    
    const reqBody = await req.json();

    console.log('reqBody',reqBody);
    console.log('reqBody.encResp',reqBody.encResp);
    
    
    
    let data = CCAvenue.redirectResponseToJson(reqBody.encResp);

    // Handle Redirect as per Payment Status
    if (data.order_status === "Success") {
      // Redirect to Payment Success Page
      return Response.redirect("/dashboard");
    } else {
      // Redirect to Payment Failed Page
      return Response.redirect("/");
    }
  } catch (error) {
    // Handling Errors if anything Issue/Problem while Payment
    console.error("Error processing CCAvenue request:", error);

    // Redirect to Payment Failed Page
    return Response.redirect("/");
  }
}
