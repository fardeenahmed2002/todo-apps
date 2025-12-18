import mongoose from "mongoose";
const connectToDb = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MongoDB URI missing!");
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log("DB connected successfully");
    mongoose.connection.on("error", (err) => {
      console.error("DB connection error:", err);
    });
  } catch (err) {
    console.error("Could not connect to DB:", err);
  }
};

export default connectToDb;
