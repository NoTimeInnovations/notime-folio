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

    if (!data?.cid && !data?.uid && !data?.at) {
      return Response.redirect(`${host}/dashboard?error=invalid-payment-data`);
    }

    if (data.order_status === "Success") {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${data?.uid}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + data?.at,
            },
            body: JSON.stringify({
              courses: data?.cid,
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
        `${host}/courses/${data?.cid}?success=payment-success`
      );
    } else {
      return Response.redirect(`${host}/dashboard?error=payment-failed`);
    }
  } catch (error) {
    console.error("Error processing CCAvenue request:", error);
    return Response.redirect(`${host}/dashboard?error=payment-response-error`);
  }

}
