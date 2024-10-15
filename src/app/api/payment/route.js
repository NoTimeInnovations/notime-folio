import CCAvenue from "@/utils/CCAvenue";

export async function POST(req, res) {
  try {
    // Decrypt the Response Data from Request Body
    let data = CCAvenue.redirectResponseToJson(req.body.encResp);

    // Handle Redirect as per Payment Status
    if (data.order_status === "Success") {
      res.redirect(302, "/onboard/success");
    } else {
      res.redirect(302, "/onboard/failed");
    }
  } catch (error) {
    // Handling Errors if anything Issue/Problem while Payment
    console.error("Error processing CCAvenue request:", error);
    res.redirect(302, "/onboard/failed");
  }
}
