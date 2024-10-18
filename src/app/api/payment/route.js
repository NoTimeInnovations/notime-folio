import CCAvenue from "@/utils/CCAvenue";

export async function POST(req) {

  const host = "https://www.notime.co.in";


  const reqUrl = new URL(req.url);
  const encryptedInfo = reqUrl.searchParams.get("info");
  const decryptedInfo = CCAvenue.decrypt(encryptedInfo);
  const details = decryptedInfo.split("&").reduce((o, pair) => {
    pair = pair.split("=");
    return (o[pair[0]] = pair[1]), o;
  }, {});


  const body = await req.text();
  const params = new URLSearchParams(body);
  const encResp = params.get('encResp');


  if(!encResp){
    return Response.redirect(`${host}${host}/courses/${details?.cid}?error=payment-response-error`);
  }

  if (!details?.cid || !details?.at || !details?.uid) {
    return Response.redirect(`${host}/courses/${details?.cid}?error=payment-cancelled`);
  }

  try {
    let data = CCAvenue.redirectResponseToJson(encResp);

    if (data.order_status === "Success") {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${details?.uid}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + details?.at,
            },
            body: JSON.stringify({
              courses: details?.cid,
            }),
          }
        );
        const user = await response.json();

        if (user?.errors?.length > 0) {
          throw new Error("Error enrolling student to course");
        }
      } catch (error) {
        console.error("Error enrolling student to course:", error);
        return Response.redirect(`${host}/courses/${details?.cid}?error=enrolling-failed`);
      }

      return Response.redirect(`${host}/courses/${details?.cid}?success=payment-success`);
    } else {
      return Response.redirect(`${host}/courses/${details?.cid}?error=payment-failed`);
    }
  } catch (error) {
    console.error("Error processing CCAvenue request:", error);
    return Response.redirect(`${host}/courses/${details?.cid}?error=payment-response-error`);
  }

  // try {
  //   // Decrypt the Response Data from Request Body

  //   if (!encResp) {
  //     throw new Error('Encrypted response (encResp) not found');
  //   }

  //   let data = CCAvenue.redirectResponseToJson(encResp);

  //   // Handle Redirect as per Payment Status
  //   if (data.order_status === "Success") {
  //     // Redirect to Payment Success Page
  //     return Response.redirect("http://www.notime.co.in/dashboard");
  //   } else {
  //     // Redirect to Payment Failed Page
  //     return Response.redirect("http://www.notime.co.in");
  //   }
  // } catch (error) {
  //   // Handling Errors if anything Issue/Problem while Payment
  //   console.error("Error processing CCAvenue request:", error);

  //   // Redirect to Payment Failed Page
  //   return Response.redirect("http://www.notime.co.in");
  // }
}
