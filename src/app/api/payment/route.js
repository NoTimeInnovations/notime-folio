import CCAvenue from "@/utils/CCAvenue";

export async function POST(req) {
  const host = "https://www.notime.co.in";

  //validating encrypted response
  const body = await req.text();
  const params = new URLSearchParams(body);
  const encResp = params.get("encResp");
  if (!encResp) {
    return Response.redirect(`${host}/dashboard?error=payment-response-error`);
  }

  //processing response
  try {
    let data = CCAvenue.redirectResponseToJson(encResp);

    console.log("res data",data);
    
    const courseId = data?.merchant_param1;
    const userId = data?.merchant_param2;
    const authToken = data?.merchant_param3;

    if (!courseId && !userId && !authToken) {
      return Response.redirect(`${host}/dashboard?error=invalid-payment-data`);
    }

    const courseDetails = await getCourseDetails(courseId);

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
              courses: {
                course: courseId,
                roadmap_id: courseDetails?.Roadmap[0]?.id,
                topic_id: courseDetails?.Roadmap[0]?.Topics[0]?.id,
              }
            }),
          }
        );
        const user = await response.json();

        if (user?.errors?.length > 0) {
          throw new Error(user?.errors[0].message);
        }
      } catch (error) {
        console.error("Error enrolling student : ", error);
        return Response.redirect(`${host}/dashboard?error=enrolling-failed`);
      }

      return Response.redirect(
        `${host}/courses/${courseId}?success=payment-success`
      );
    } else {
      return Response.redirect(`${host}/dashboard?error=payment-failed`);
    }
  } catch (error) {
    console.error("Error processing CCAvenue request:", error);
    return Response.redirect(`${host}/dashboard?error=payment-response-error`);
  }

}


async function getCourseDetails(courseId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses/${courseId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching course details: ", error);
  }
  
}