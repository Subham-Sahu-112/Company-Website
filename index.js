import Express from "express";
import path from "path";
import engine from "ejs-mate";
import { fileURLToPath } from "url";
import { dirname } from "path";
import nodemailer from "nodemailer";

const app = Express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Components"));
app.use(Express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.use(Express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("pages/Home.ejs");
});

app.post("/send-mail", async (req, res) => {
  const { name, company, email, service, details } = req.body;

  // Transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sahusubhan112@gmail.com", // Use your email
      pass: "gnyo gldq kkxo igil",
    },
  });

  // Mail options
  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: "sahusubhan112@gmail.com",
    subject: `New Inquiry - ${service}`,
    text: `
      Name: ${name}
      Company: ${company}
      Email: ${email}
      Service: ${service}
      Details: ${details}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
});

app.get('/services', (req, res) => {
  res.render('routes/Services.ejs');
});

app.get('/services/legal-service', (req, res) => {
  res.render('routes/Legal.ejs');
});

app.get('/services/IT-service', (req, res) => {
  res.render('routes/IT.ejs');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
