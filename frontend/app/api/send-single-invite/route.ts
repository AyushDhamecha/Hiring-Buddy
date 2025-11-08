import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface SingleInviteApiPayload {
  candidateName: string;
  candidateEmail: string;
  candidatePosition: string;
  interviewDate: string;
  interviewTime: string;
  interviewLocation: string;
  additionalNotes?: string;
  companyName?: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const generateIndividualInterviewEmail = (
  candidateName: string,
  jobPosition: string,
  interviewDate: string,
  interviewTime: string,
  interviewLocation: string,
  additionalNotes?: string,
  companyName: string = "Your Company"
): { subject: string; text: string; html: string } => {
  const subject = `Interview Invitation: ${jobPosition} at ${companyName}`;
  const text = `
Dear ${candidateName},

We were impressed with your application for the ${jobPosition} position at ${companyName} and would like to invite you for an interview.

Interview Details:
Date: ${interviewDate}
Time: ${interviewTime}
Location/Mode: ${interviewLocation}
${additionalNotes ? `\nAdditional Notes: ${additionalNotes}\n` : ""}
Please confirm your availability.

Best regards,
The Hiring Team
${companyName}
  `.trim();
  const html = `
<p>Dear ${candidateName},</p>
<p>We were impressed with your application for the <strong>${jobPosition}</strong> position at <strong>${companyName}</strong>.</p>
<p><strong>Interview Details:</strong></p>
<ul>
  <li><strong>Date:</strong> ${interviewDate}</li>
  <li><strong>Time:</strong> ${interviewTime}</li>
  <li><strong>Location/Mode:</strong> ${interviewLocation}</li>
</ul>
${
  additionalNotes
    ? `<p><strong>Additional Notes:</strong><br>${additionalNotes.replace(
        /\n/g,
        "<br>"
      )}</p>`
    : ""
}
<p>Please confirm your availability.</p>
<p>Best regards,<br>
The Hiring Team<br>
${companyName}</p>
  `.trim();
  return { subject, text, html };
};

export async function POST(request: NextRequest) {
  try {
    if (
      !process.env.EMAIL_SERVER_USER ||
      !process.env.EMAIL_SERVER_PASSWORD ||
      !process.env.EMAIL_FROM_ADDRESS
    ) {
      console.error("CRITICAL: Email server env vars not set.");
      return NextResponse.json(
        { message: "Email service not configured on server." },
        { status: 503 }
      );
    }

    const payload = (await request.json()) as SingleInviteApiPayload;
    const {
      candidateName,
      candidateEmail,
      candidatePosition,
      interviewDate,
      interviewTime,
      interviewLocation,
      additionalNotes,
      companyName,
    } = payload;

    if (
      !candidateName ||
      !candidateEmail ||
      !candidatePosition ||
      !interviewDate ||
      !interviewTime ||
      !interviewLocation
    ) {
      return NextResponse.json(
        { message: "Missing required fields for sending invite." },
        { status: 400 }
      );
    }

    const { subject, text, html } = generateIndividualInterviewEmail(
      candidateName,
      candidatePosition,
      interviewDate,
      interviewTime,
      interviewLocation,
      additionalNotes,
      companyName
    );

    const mailOptions = {
      from: process.env.EMAIL_FROM_ADDRESS,
      to: candidateEmail,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      `Single invite email sent to ${candidateEmail}: ${info.messageId}`
    );

    return NextResponse.json({
      message: `Interview invitation successfully sent to ${candidateName}.`,
    });
  } catch (error: any) {
    console.error("API Error in /api/send-single-invite:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
