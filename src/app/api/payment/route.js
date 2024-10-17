import CCAvenue from "@/utils/CCAvenue";


export async function POST(req) {
  try {
    // Decrypt the Response Data from Request Body
    let data = CCAvenue.redirectResponseToJson(req.body.encResp);
    const reqUrl = new URL(req.url);
    const courseId = reqUrl.searchParams.get("id");
    const authToken = reqUrl.searchParams.get("auth_token");
    const userId = reqUrl.searchParams.get("user_id");

    console.log({
      courseId,
      authToken,
      userId,
      data,
    });
    

    if(!courseId || !authToken || !userId){
      return Response.redirect(`/courses/${courseId}?error=payment-failed`);
    }

    if (data.order_status === "Success") {

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
            },
            body: JSON.stringify({
              courses: courseId,
            }),
          }
        );
        const user = await response.json();

        if(user?.errors?.length > 0){
          throw new Error("Error enrolling student to course");
        }

      } catch (error) {
        console.error("Error enrolling student to course:", error);
        return Response.redirect(`/courses/${courseId}?error=payment-failed`);
      }

      return Response.redirect(`/courses/${courseId}?success=payment-success`);

    } else {
      return Response.redirect(`/courses/${courseId}?error=payment-failed`);
    }
  } catch (error) {
    console.error("Error processing CCAvenue request:", error);
    return Response.redirect(`/courses/${courseId}?error=payment-failed`);
  }
}
