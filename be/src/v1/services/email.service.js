"use strict";

const OTPService = require("./otp.service");
const { getTemplateByName } = require("./template.service");
const { replacePlaceHolder } = require("../utils");
const transporter = require("../databases/init.nodemailer");


class EmailService {

    static async sendTokenEmail({ email }) {
        try {
            const otp = await OTPService.newOTP(email);

            // get template
            const template = await getTemplateByName('EMAIL_RESET_PASSWORD');

            const content = replacePlaceHolder(template.html, {
                reset_link: `http://localhost:5000/reset-password?token=${otp.token}&email=${email}`,
            });

            // send email
            const mailOptions = {
                from: ' "Glemini <glemini.dev@gmai.com>" ',
                to: email,
                subject: "Forgot password Chat App",
                text: "Forgot password Chat App",
                html: content,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log("Send email::", error);
        }
    }
}

module.exports = EmailService;