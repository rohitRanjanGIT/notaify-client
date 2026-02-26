import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        let smtpUser: string;
        let smtpPass: string;
        let emailTo: string;

        // Support both: passing credentials directly OR looking up by project_id
        if (body.smtpUser && body.smtpPass && body.emailTo) {
            smtpUser = body.smtpUser;
            smtpPass = body.smtpPass;
            emailTo = body.emailTo;
        } else if (body.project_id) {
            const currentProject = await prisma.project.findUnique({
                where: { id: body.project_id },
            });

            if (!currentProject) {
                return NextResponse.json(
                    { message: 'error', error: 'Project not found' },
                    { status: 404 }
                );
            }

            if (!currentProject.smtpUser || !currentProject.smtpPass || !currentProject.emailTo) {
                return NextResponse.json(
                    { message: 'error', error: 'Project is missing SMTP configuration. Please set SMTP User, SMTP Password, and Email To.' },
                    { status: 400 }
                );
            }

            smtpUser = currentProject.smtpUser;
            smtpPass = currentProject.smtpPass;
            emailTo = currentProject.emailTo;
        } else {
            return NextResponse.json(
                { message: 'error', error: 'Please provide SMTP credentials (smtpUser, smtpPass, emailTo) or a project_id.' },
                { status: 400 }
            );
        }

        // Create transporter with the provided credentials
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            connectionTimeout: 5000,
            greetingTimeout: 5000,
            socketTimeout: 5000,
        });

        // Verify connection first
        await transporter.verify();

        // Send a test email
        const testEmailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 560px; margin: 40px auto; padding: 0; }
        .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .banner { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 32px 24px; text-align: center; }
        .banner h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
        .banner p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; }
        .check-icon { width: 56px; height: 56px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 28px; }
        .body { padding: 28px 24px; }
        .info-row { display: flex; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
        .info-label { font-size: 13px; color: #6b7280; font-weight: 500; min-width: 100px; }
        .info-value { font-size: 13px; color: #111827; font-weight: 600; }
        .footer { padding: 20px 24px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f0f0f0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="banner">
                <div class="check-icon">✅</div>
                <h1>SMTP Configuration Verified!</h1>
                <p>Your email credentials are working correctly</p>
            </div>
            <div class="body">
                <div class="info-row">
                    <span class="info-label">From</span>
                    <span class="info-value">${smtpUser}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">To</span>
                    <span class="info-value">${emailTo}</span>
                </div>
                <div class="info-row" style="border-bottom: none;">
                    <span class="info-label">Sent At</span>
                    <span class="info-value">${new Date().toLocaleString()}</span>
                </div>
            </div>
            <div class="footer">
                This is a test email from <strong>Notaify</strong> to verify your SMTP configuration.
            </div>
        </div>
    </div>
</body>
</html>`;

        await transporter.sendMail({
            from: `Notaify Test <${smtpUser}>`,
            to: emailTo,
            subject: `✅ Notaify — SMTP Test Successful`,
            html: testEmailHtml,
        });

        return NextResponse.json({
            message: 'success',
            data: `Test email sent successfully to ${emailTo}`,
        });
    } catch (error) {
        console.error('Trial mail error:', error);

        let errorMessage = 'Failed to send test email.';
        if (error instanceof Error) {
            if (error.message.includes('Invalid login') || error.message.includes('auth')) {
                errorMessage = 'Authentication failed. Please check your SMTP username and password (use an App Password for Gmail).';
            } else if (error.message.includes('ECONNREFUSED') || error.message.includes('ETIMEDOUT')) {
                errorMessage = 'Could not connect to the SMTP server. Please check your network and try again.';
            } else if (error.message.includes('self signed certificate')) {
                errorMessage = 'SSL certificate error. Try with a different SMTP configuration.';
            } else {
                errorMessage = error.message;
            }
        }

        return NextResponse.json(
            { message: 'error', error: errorMessage },
            { status: 500 }
        );
    }
}