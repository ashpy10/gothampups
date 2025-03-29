const nodemailer = require("nodemailer");

const sendEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const message = {
    from: "azfountas@gmail.com",
    to: "azfountas@gmail.com", // Receive notifications here
    subject: "New Puppy Application Received",
    text: `
      You have a new puppy application from ${formData.name}.
      Email: ${formData.email}
      Phone: ${formData.tel}
      Location: ${formData.location}
      Interested in: ${formData.puppy_option.join(", ")}
      Reason: ${formData.why}
      Experience: ${formData.experience}
      Questions for us: ${formData.questions}
    `,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
