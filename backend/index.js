const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const authcontroller = require('./controllers/authcontroller')
app.use(cors());




// Verify environment variables
console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("PORT:", process.env.PORT);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Mongo');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit if connection fails
  }
}

connectDB();
//routes & middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/auth", authcontroller)

app.listen(process.env.PORT, () => {
  console.log(`Server has started successfully on port ${process.env.PORT}`);
});
