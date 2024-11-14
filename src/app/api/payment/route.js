import CCAvenue from "@/utils/CCAvenue";

export async function POST(req) {
  const host = "https://www.notime.co.in";

  // Validating encrypted response
  const body = await req.text();
  const params = new URLSearchParams(body);
  const encResp = params.get("encResp");
  if (!encResp) {
    return Response.redirect(`${host}/payment`);
  }

  // Processing response
  try {
    const data = CCAvenue.redirectResponseToJson(encResp);
    console.log("Response data", data);

    const courseId = data?.merchant_param1;
    const userId = data?.merchant_param2;
    const authToken = data?.merchant_param3;

    if (!courseId || !userId || !authToken) {
      console.log("Invalid payment data");
      return Response.redirect(`${host}/payment`);
    }

    const courseDetails = await getCourseDetails(courseId);

    if (data.order_status === "Success") {
      try {
        // Fetch current user data to get existing courses
        const currentUserResponse = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${userId}?select[courses]=true`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const currentUserData = await currentUserResponse.json();

        // Get existing courses array or initialize it if undefined
        const existingCourses = currentUserData?.courses || [];

        // Add the new course to the existing courses array
        const updatedCourses = [
          ...existingCourses,
          {
            course: courseId,
            roadmap_id: courseDetails?.Roadmap[0]?.id,
            topic_id: courseDetails?.Roadmap[0]?.Topics[0]?.id,
          },
        ];

        console.log("Updated courses", updatedCourses);
        

        // Send the updated courses array back to the server
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${userId}?select[courses]=true&select[isEnrolled]=true`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ courses: updatedCourses , isEnrolled : true }),
          }
        );

        const user = await response.json();

        if (user?.errors?.length > 0) {
          throw new Error(user);
        }
        console.log("User enrolled successfully");
        return Response.redirect(`${host}/payment?type=success`);
      } catch (error) {
        console.error("Error enrolling student:", error);
        return Response.redirect(`${host}/payment`);
      }
    } else {
      console.log("Order status is not success");
      return Response.redirect(`${host}/payment`);
    }
  } catch (error) {
    console.error("Error processing CCAvenue request:", error);
    return Response.redirect(`${host}/payment`);
  }
}

async function getCourseDetails(courseId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses/${courseId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching course details:", error);
  }
}
