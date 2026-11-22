export async function POST(request: Request) {
  await request.json().catch(() => null);
  return Response.json({
    success: true,
    data: { url: "/soju.png" },
  });
}
