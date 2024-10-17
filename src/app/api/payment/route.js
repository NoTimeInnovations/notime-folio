import CCAvenue from "@/utils/CCAvenue";
import { cookies } from "next/headers";

export async function POST(req, res) {

  const reqUrl = new URL(req.url);
  const courseId = reqUrl.searchParams.get("id");
  const userId = JSON.parse(cookies().get("user")?.value)?.id;
  const authToken = cookies().get("auth_token")?.value;

  console.log({
    courseId,
    authToken,
    userId,
    data,
  });

  if (!courseId || !authToken || !userId) {
    res.redirect(`/courses/${courseId}?error=payment-failed`);
  }

  try {
    
    let data = CCAvenue.redirectResponseToJson(req.body.encResp);

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

        if (user?.errors?.length > 0) {
          throw new Error("Error enrolling student to course");
        }
      } catch (error) {
        console.error("Error enrolling student to course:", error);
        res.redirect(`/courses/${courseId}?error=payment-failed`);
      }

      res.redirect(`/courses/${courseId}?success=payment-success`);
    } else {
      res.redirect(`/courses/${courseId}?error=payment-failed`);
    }
  } catch (error) {
    console.error("Error processing CCAvenue request:", error);
    res.redirect(`/courses/${courseId}?error=payment-failed`);
  }
}
