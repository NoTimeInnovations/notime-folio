import CCAvenue from "@/utils/CCAvenue";

export async function POST(req) {

  try {
    // Decrypt the Response Data from Request Body
    
    const body = await req.text();

    console.log(body);
    
    const params = new URLSearchParams(body);
    const encResp = params.get('encResp');
    if (!encResp) {
      throw new Error('Encrypted response (encResp) not found');
    }
    
    let data = CCAvenue.redirectResponseToJson(encResp);

    // Handle Redirect as per Payment Status
    if (data.order_status === "Success") {
      // Redirect to Payment Success Page
      return Response.redirect("http://www.notime.co.in/dashboard");
    } else {
      // Redirect to Payment Failed Page
      return Response.redirect("http://www.notime.co.in");
    }
  } catch (error) {
    // Handling Errors if anything Issue/Problem while Payment
    console.error("Error processing CCAvenue request:", error);

    // Redirect to Payment Failed Page
    return Response.redirect("http://www.notime.co.in");
  }
}
