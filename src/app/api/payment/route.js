import CCAvenue from "@/utils/CCAvenue";

export async function POST(req) {
  // const reqUrl = new URL(req.url);
  // const courseId = reqUrl.searchParams.get("cid");
  // const userId = reqUrl.searchParams.get("uid");
  // const authToken = reqUrl.searchParams.get("at");

  // console.log({
  //   courseId,
  //   authToken,
  //   userId,
  //   data,
  // });

  // if (!courseId || !authToken || !userId) {
  //   return res.redirect(`/courses/${courseId}?error=payment-cancelled`);
  // }

  // try {

  //   let data = CCAvenue.redirectResponseToJson(req.body.encResp);

  //   if (data.order_status === "Success") {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${userId}`,
  //         {
  //           method: "PATCH",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + authToken,
  //           },
  //           body: JSON.stringify({
  //             courses: courseId,
  //           }),
  //         }
  //       );
  //       const user = await response.json();

  //       if (user?.errors?.length > 0) {
  //         throw new Error("Error enrolling student to course");
  //       }
  //     } catch (error) {
  //       console.error("Error enrolling student to course:", error);
  //       return res.redirect(`/courses/${courseId}?error=enrolling-failed`);
  //     }

  //     return res.redirect(`/courses/${courseId}?success=payment-success`);
  //   } else {
  //     return res.redirect(`/courses/${courseId}?error=payment-failed`);
  //   }
  // } catch (error) {
  //   console.error("Error processing CCAvenue request:", error);
  //   return res.redirect(`/courses/${courseId}?error=payment-response-error`);
  // }

  try {
    // Decrypt the Response Data from Request Body
    console.log("req.body ", req.body);
    
    let data = CCAvenue.redirectResponseToJson(req.body.encResp);

    // Handle Redirect as per Payment Status
    if (data.order_status === "Success") {
      // Redirect to Payment Success Page
      return Response.redirect(302, "/dashboard");
    } else {
      // Redirect to Payment Failed Page
      return Response.redirect(302, "/");
    }
  } catch (error) {
    // Handling Errors if anything Issue/Problem while Payment
    console.error("Error processing CCAvenue request:", error);

    // Redirect to Payment Failed Page
    return Response.redirect(302, "/");
  }
}
