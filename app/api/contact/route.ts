import { NextResponse } from "next/server"
import { Resend } from "resend"

// Import the environment utility
import { getEnv } from "@/lib/env"

// Initialize Resend with API key from environment utility
const resendApiKey = getEnv("RESEND_API_KEY")
const resend = new Resend(resendApiKey)
const recaptchaSecret = getEnv("RECAPTCHA_SECRET_KEY")

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
    const { email, subject, message, token } = body

    if (!recaptchaSecret) {
      console.error("RECAPTCHA_SECRET_KEY is not set")
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 },
      )
    }

    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(token)}`,
      },
    )

    const verifyData = await verifyResponse.json()

    if (!verifyData.success) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA verification failed" },
        { status: 400 },
      )
    }

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: subject || "Contact Form Submission",
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
