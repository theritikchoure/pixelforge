const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");
const tmp = require("tmp");
const jwt = require("jsonwebtoken");
const checkAuth = require('./middlewares/check-auth.middleware');
const applyRateLimit = require("./middlewares/rate-limit.middleware");

const app = express();
const port = 3001;

// Set up Multer for file uploads with size limit
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 20 MB
});

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

// Endpoint to upload and process an image
app.post(
  "/convert",
  checkAuth,
  applyRateLimit,
  upload.single("file"),
  async (req, res) => {
    try {
      const tmpFile = tmp.fileSync(); // Creates a temporary file

      const conversionType = req.body.conversionType || "webp";
      const rotateAngle = parseInt(req.body.rotate, 10);
      const flip = req.body.flip === "true"; // 'true' or 'false'

      let image = sharp(req.file.path);

      if (rotateAngle) {
        image = image.rotate(rotateAngle);
      }

      if (flip) {
        image = image.flip(); // You can also use image.flop() for horizontal flip
      }

      // Perform image processing with Sharp (resize, grayscale, and convert to WebP)
      const processedImage = await image
        .toFormat(conversionType) // Convert to WebP format
        .toFile(tmpFile.name);

      // Send the processed image as a response
      res.sendFile(tmpFile.name, () => tmpFile.removeCallback());
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing image");
    }
  }
);

app.get("/login", (req, res) => {
//   const { username } = req.body;

  // Normally, you'd check username/password in your database here
  const user = { id: 1, username: 'ritik' }; // Example user

  // Create a token valid for 24 hours
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "24h" });

  res.json({ token });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
