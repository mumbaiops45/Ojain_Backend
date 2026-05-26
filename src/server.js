//   // // // const express = require("express");

//   // // // const dotenv = require("dotenv");

//   // // // const cors = require("cors");

//   // // // const connectDB = require("./config/db");



//   // // // // CONFIG
//   // // // dotenv.config();



//   // // // // DATABASE
//   // // // connectDB();



//   // // // // APP
//   // // // const app = express();



//   // // // // MIDDLEWARE
//   // // // app.use(express.json());

//   // // // app.use(
//   // // //   cors({
//   // // //     origin: "http://localhost:3000",
//   // // //     credentials: true,
//   // // //   })
//   // // // );



//   // // // // TEST ROUTE
//   // // // app.get("/", (req, res) => {
//   // // //   res.send("API Running");
//   // // // });



//   // // // // ROUTES
//   // // // app.use("/api/auth",
//   // // //   require("./routes/authRoutes")
//   // // // );

//   // // // app.use(
//   // // //   "/api/products",
//   // // //   require("./routes/productRoutes")
//   // // // );

//   // // // app.use(
//   // // //   "/api/orders",
//   // // //   require("./routes/orderRoutes")
//   // // // );

//   // // // app.use(
//   // // //   "/api/vendors",
//   // // //   require("./routes/vendorRoutes")
//   // // // );

//   // // // app.use(
//   // // //   "/api/payouts",
//   // // //   require("./routes/payoutRoutes")
//   // // // );

//   // // // const cookieParser = require("cookie-parser");
//   // // // app.use(cookieParser());



//   // // // // SERVER
//   // // // const PORT =
//   // // //   process.env.PORT || 5000;

//   // // // app.listen(PORT, () => {
//   // // //   console.log(
//   // // //     `Server running on port ${PORT}`
//   // // //   );
//   // // // });

//   // // const express = require("express");
//   // // const dotenv = require("dotenv");
//   // // const cors = require("cors");
//   // // const cookieParser = require("cookie-parser");
//   // // const connectDB = require("./config/db");

//   // // dotenv.config();
//   // // connectDB();

//   // // const app = express();

//   // // // ORDER MATTERS: cookieParser BEFORE routes
//   // // app.use(express.json());
//   // // app.use(cookieParser());
//   // // app.use(cors({
//   // //   origin: "http://localhost:3000",
//   // //   credentials: true,
//   // // }));

//   // // app.get("/", (req, res) => res.send("API Running"));

//   // // // Routes
//   // // app.use("/api/auth", require("./routes/authRoutes"));
//   // // app.use("/api/products", require("./routes/productRoutes"));
//   // // app.use("/api/orders", require("./routes/orderRoutes"));
//   // // app.use("/api/vendors", require("./routes/vendorRoutes"));
//   // // app.use("/api/admin", require("./routes/adminRoutes"));
//   // // app.use("/api/payouts", require("./routes/payoutRoutes"));

//   // // const PORT = process.env.PORT || 5000;
//   // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




//   // // const express = require("express");

//   // // const dotenv = require("dotenv");

//   // // const cors = require("cors");

//   // // const connectDB = require("./config/db");



//   // // // CONFIG
//   // // dotenv.config();



//   // // // DATABASE
//   // // connectDB();



//   // // // APP
//   // // const app = express();



//   // // // MIDDLEWARE
//   // // app.use(express.json());

//   // // app.use(
//   // //   cors({
//   // //     origin: "http://localhost:3000",
//   // //     credentials: true,
//   // //   })
//   // // );



//   // // // TEST ROUTE
//   // // app.get("/", (req, res) => {
//   // //   res.send("API Running");
//   // // });



//   // // // ROUTES
//   // // app.use("/api/auth",
//   // //   require("./routes/authRoutes")
//   // // );

//   // // app.use(
//   // //   "/api/products",
//   // //   require("./routes/productRoutes")
//   // // );

//   // // app.use(
//   // //   "/api/orders",
//   // //   require("./routes/orderRoutes")
//   // // );

//   // // app.use(
//   // //   "/api/vendors",
//   // //   require("./routes/vendorRoutes")
//   // // );

//   // // app.use(
//   // //   "/api/payouts",
//   // //   require("./routes/payoutRoutes")
//   // // );

//   // // const cookieParser = require("cookie-parser");
//   // // app.use(cookieParser());



//   // // // SERVER
//   // // const PORT =
//   // //   process.env.PORT || 5000;

//   // // app.listen(PORT, () => {
//   // //   console.log(
//   // //     `Server running on port ${PORT}`
//   // //   );
//   // // });

//   // const express = require("express");
//   // const dotenv = require("dotenv");
//   // const cors = require("cors");
//   // const cookieParser = require("cookie-parser");
//   // const connectDB = require("./config/db");
//   // const cartRoutes = require("./routes/cartRoutes");
//   // const addressRoutes = require("./routes/addressRoutes");
//   // const orderRoutes = require("./routes/orderRoutes");
//   // const paymentRoutes = require("./routes/paymentRoutes");
//   // dotenv.config();
//   // connectDB();

//   // const app = express();

//   // // ORDER MATTERS: cookieParser BEFORE routes
//   // app.use(express.json());
//   // app.use(cookieParser());
//   // app.use(cors({
//   //   origin: "http://localhost:3000",
//   //   credentials: true,
//   // }));

//   // app.get("/", (req, res) => res.send("API Running"));

//   // // Routes
//   // app.use("/api/auth", require("./routes/authRoutes"));
//   // app.use("/api/products", require("./routes/productRoutes"));
//   // app.use("/api/vendors", require("./routes/vendorRoutes"));
//   // app.use("/api/admin", require("./routes/adminRoutes"));
//   // app.use("/api/payouts", require("./routes/payoutRoutes"));
//   // app.use("/api/category", require("./routes/categoryRoutes")); 
//   // app.use("/uploads", express.static("uploads"));
//   // app.use('/api/cart', cartRoutes);  
//   // app.use("/api/address", addressRoutes);
//   // app.use("/api/orders", orderRoutes);
//   // app.use("/api/payments", paymentRoutes);
//   // const PORT = process.env.PORT || 5000;
//   // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




//   const express = require("express");

// const dotenv = require("dotenv");

// const cors = require("cors");

// const cookieParser = require("cookie-parser");

// const connectDB = require("./config/db");

// // ==========================================
// // IMPORT ROUTES
// // ==========================================

// const authRoutes = require("./routes/authRoutes");

// const adminRoutes = require("./routes/adminRoutes");

// const productRoutes = require("./routes/productRoutes");

// const categoryRoutes = require("./routes/categoryRoutes");

// const vendorRoutes = require("./routes/vendorRoutes");

// const orderRoutes = require("./routes/orderRoutes");

// const cartRoutes = require("./routes/cartRoutes");

// const addressRoutes = require("./routes/addressRoutes");

// const payoutRoutes = require("./routes/payoutRoutes");

// const paymentRoutes = require("./routes/paymentRoutes");

// // ==========================================
// // CONFIG ENV
// // ==========================================

// dotenv.config();

// // ==========================================
// // CONNECT DATABASE
// // ==========================================

// connectDB();

// // ==========================================
// // INIT APP
// // ==========================================

// const app = express();

// // ==========================================
// // MIDDLEWARE
// // ==========================================

// // BODY PARSER
// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// // COOKIE PARSER
// app.use(cookieParser());

// // CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",

//     credentials: true,
//   })
// );

// // ==========================================
// // STATIC FOLDER
// // ==========================================

// app.use(
//   "/uploads",
//   express.static("uploads")
// );

// // ==========================================
// // ROOT ROUTE
// // ==========================================

// app.get("/", (req, res) => {
//   res.send("API Running...");
// });

// // ==========================================
// // API ROUTES
// // ==========================================

// // AUTH
// app.use(
//   "/api/auth",
//   authRoutes
// );

// // ADMIN
// app.use(
//   "/api/admin",
//   adminRoutes
// );

// // PRODUCTS
// app.use(
//   "/api/products",
//   productRoutes
// );

// // CATEGORY
// app.use(
//   "/api/category",
//   categoryRoutes
// );

// // VENDORS
// app.use(
//   "/api/vendors",
//   vendorRoutes
// );

// // ORDERS
// app.use(
//   "/api/orders",
//   orderRoutes
// );

// // CART
// app.use(
//   "/api/cart",
//   cartRoutes
// );

// // ADDRESS
// app.use(
//   "/api/address",
//   addressRoutes
// );

// // PAYOUTS
// app.use(
//   "/api/payouts",
//   payoutRoutes
// );

// // PAYMENTS
// app.use(
//   "/api/payments",
//   paymentRoutes
// );

// // ==========================================
// // 404 ROUTE HANDLER
// // ==========================================

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,

//     message: "Route not found",
//   });
// });

// // ==========================================
// // GLOBAL ERROR HANDLER
// // ==========================================

// app.use(
//   (err, req, res, next) => {
//     console.log(err);

//     res.status(500).json({
//       success: false,

//       message:
//         err.message ||
//         "Internal Server Error",
//     });
//   }
// );

// // ==========================================
// // SERVER
// // ==========================================

// const PORT =
//   process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(
//     `Server running on port ${PORT}`
//   );
// });


const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const payoutRoutes = require("./routes/payoutRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// DB CONNECT (AFTER dotenv.config)
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payouts", payoutRoutes);
app.use("/api/payments", paymentRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});