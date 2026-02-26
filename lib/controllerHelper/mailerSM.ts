import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rrohit2005@gmail.com",
    pass: "",
  },
});

export async function sendMail({to,subject,html,}: {to: string;subject: string;html: string;}) {
  return transporter.sendMail({
    from: "Notaify <rrohit2005@gmail.com>",
    to,
    subject,
    html,
  });
}
