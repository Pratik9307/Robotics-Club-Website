

// Import routes


const adminRegisterRoutes = require('./routes/adminAuthantication');
const adminLoginRoutes = require('./routes/adminLogin');





const express = require("express");
const app = express();

const adminRoutes = require('./routes/admin');

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const Usercontact =require("./routes/UserContact")


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connection
const {connectDb}=require("./config/database")
connectDb();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
app.use("/api/v1", cloudinaryRoutes);

// Cloudinary connection
cloudinaryConnect();



// Routes
app.use('/api/admin', adminRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use('/api/admin', adminRegisterRoutes);
app.use('/api/admin', adminLoginRoutes);
app.use('/api/admin', Usercontact);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
