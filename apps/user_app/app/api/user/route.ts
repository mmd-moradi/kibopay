import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if(!session?.user) {
    return NextResponse.json({
      status: 403,
      message: "You are not logged in"
    })
  }
  return NextResponse.json({
    user: session.user
  })
}








