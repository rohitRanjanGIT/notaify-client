import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/controllerHelper/mailerSM"

export async function POST(req: NextRequest) {

  try {
    await sendMail({
      to: "neqs45@gmail.com",
      subject: "Welcome to Our Platform 🚀",
      html: `
        <h1>Hello Rohit</h1>
        <p>Thanks for joining us!</p>
      `,
    });
    return NextResponse.json({ message: "Email sent successfully" });
  
} catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }

}