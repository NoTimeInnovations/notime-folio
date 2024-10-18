import CCAvenue from "@/utils/CCAvenue";

export async function POST(req) {
  const host = "https://www.notime.co.in";
  let details;

  //extracting details from url
  try {
    const reqUrl = new URL(req.url);
    // const encryptedInfo = Buffer.from(reqUrl.searchParams.get("info"), "hex")
    // if(!encryptedInfo){
    //   return Response.redirect(`${host}/dashboard?error=payment-cancelled`);
    // }

    // const decryptedInfo = CCAvenue.decrypt(encryptedInfo);
    const info = reqUrl.searchParams.get("info");
    if (!info) {
      return Response.redirect(`${host}/dashboard?error=payment-cancelled`);
    }
    details = info.split("&").reduce((o, pair) => {
      pair = pair.split("=");
      return (o[pair[0]] = pair[1]), o;
    }, {});
    console.log("Details: ", details);
    
  } catch (error) {
    console.error("Error decrypting info: ", error);
    return Response.redirect(`${host}/dashboard?error=decryption-error`);
  }

  //validating encrypted response
  const body = await req.text();
  const params = new URLSearchParams(body);
  const encResp = params.get("encResp");
  if (!encResp) {
    return Response.redirect(
      `${host}/dashboard?error=payment-response-error`
    );
  }

  //processing response
  try {
    let data = CCAvenue.redirectResponseToJson(encResp);

    console.log( "res data : ",data);
    
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
          throw new Error(user?.errors[0].message);
        }
      } catch (error) {
        console.error("Error enrolling student : ", error);
        return Response.redirect(
          `${host}/dashboard?error=enrolling-failed`
        );
      }

      return Response.redirect(
        `${host}/courses/${details?.cid}?success=payment-success`
      );
    } else {
      return Response.redirect(
        `${host}/dashboard?error=payment-failed`
      );
    }
  } catch (error) {
    console.error("Error processing CCAvenue request:", error);
    return Response.redirect(
      `${host}/dashboard?error=payment-response-error`
    );
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
