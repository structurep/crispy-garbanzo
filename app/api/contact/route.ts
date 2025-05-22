import { NextResponse } from "next/server"
import { Resend } from "resend"

// Import the environment utility
import { getEnv } from "@/lib/env"

// Initialize Resend with API key from environment utility
const resendApiKey = getEnv("RESEND_API_KEY")
const contactEmail = getEnv("CONTACT_EMAIL")
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
    const {
      name,
      email,
      company,
      phone,
      message,
      interestArea,
      bestTimeToCall,
    } = body

    if (!contactEmail) {
      console.error("CONTACT_EMAIL is not set")
      return NextResponse.json(
        { success: false, message: "Contact email not configured" },
        { status: 500 },
      )
    }

    const data = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: [contactEmail],
      reply_to: email,
      subject: subject || "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Interest Area:</strong> ${interestArea}</p>
        <p><strong>Best Time To Call:</strong> ${bestTimeToCall || ""}</p>
        <p><strong>Message:</strong><br/>${message}</p>
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
