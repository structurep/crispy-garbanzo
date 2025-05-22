import { NextResponse } from "next/server"
import { Resend } from "resend"

// Import the environment utility
import { getEnv } from "@/lib/env"

// Initialize Resend with API key from environment utility
const resendApiKey = getEnv("RESEND_API_KEY")
const resend = new Resend(resendApiKey)

export async function POST(request: Request) {
  try {
    // Check if API key is available with better error handling
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set")
      return NextResponse.json(
        {
          success: false,
          message: "Email service not configured. Please contact support.",
        },
        { status: 500 },
      )
    }

    const body = await request.json()
    const { email, message } = body

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      html: `
        <div>
          <p>Thank you for contacting us!</p>
          <p>Here is your message: ${message}</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      data,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, message: "Failed to send email", error }, { status: 500 })
  }
}
