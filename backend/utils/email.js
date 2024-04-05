const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const { htmlToText } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Atharva Adam <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // console.log(process.env.NODE_ENV);
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST, //sandbox.smtp.mailtrap.io
      port: process.env.EMAIL_PORT, //2525
      auth: {
        user: process.env.EMAIL_USERNAME, //554d5c5e7b7a7e
        pass: process.env.EMAIL_PASSWORD, //32b54257cec1ec
      },
    });
  }

  async send(template, subject) {
    // 1)Render html page

    const templatePath = `${__dirname}/../../frontend/src/components/utils/${template}.html`;

    // Read the JSX template file
    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

    // Replace this.firstName, this.url, etc. with the actual data you want to pass
    const html = ejs.render(htmlTemplate, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2)Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText(html, {
        wordwrap: 130,
        ignoreHref: true,
      }),
      html,
    };
    // 3)Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      "Welcome",
      "Welcome to A2Z Family! , We're glad to have you 🎉🙏"
    );
  }
  async sendPasswordReset() {
    await this.send(
      "PasswordReset",
      "Your password reset token. (Valid only for 10 minutes.)"
    );
  }
};
