import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as fs from 'fs';
import path from 'path'

export async function POST(request: NextRequest) {
    // const { email, name, message } = await request.json();
    const data = await request.text(); // Get the entire data as a string
    const parsedData = JSON.parse(data); // Parse if JSON format
    const parsedBody = JSON.parse(parsedData.body)
    console.log("Data",parsedBody)

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const emailTemplatePath = path.join(process.cwd(), "templates", "email.html");
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

    const htmlContent = emailTemplate
        .replace('{{fullname}}', parsedBody.fullname)
        .replace('{{name}}', parsedBody.fullname)
        .replace('{{email}}', parsedBody.email)

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: process.env.MY_EMAIL,
        subject: `Message from ${parsedBody.fullname} - ${parsedBody.email}`,
        html: htmlContent,
    };

    const sendMailPromise = () => new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err:any) {
            if (!err) {
                resolve('Email sent');
            } else {
                reject(err.message);
            }
        });
    });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Email sent' });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
