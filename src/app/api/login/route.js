export async function POST(req) {
  console.log(await req.json())
  return Response.json({ msg:"login credentials received" });
}
