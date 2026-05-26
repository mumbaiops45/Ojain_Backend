// // const mongoose = require("mongoose");

// // const connectDB = async () => {
// //   try {
// //     const conn = await mongoose.connect(
// //       process.env.MONGO_URI
// //     );

// //     console.log(
// //       `MongoDB Connected: ${conn.connection.host}`
// //     );
// //   } catch (error) {
// //     console.log(error.message);
// //     process.exit(1);
// //   }
// // };

// // module.exports = connectDB;


// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {

//     // DEBUG
//     console.log("MONGO_URI:", process.env.MONGO_URI);

//     const conn = await mongoose.connect(
//       process.env.MONGO_URI
//     );

//     console.log(
//       `MongoDB Connected: ${conn.connection.host}`
//     );

//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    if (!process.env.MONGO_URI) {
      console.log("MONGO_URI is missing");
      process.exit(1);
    }

    console.log("MONGO_URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

  } catch (error) {

    console.log("Database Error:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;