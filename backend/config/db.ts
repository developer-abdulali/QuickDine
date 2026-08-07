import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB Connected!"),
    );
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.log("Error while connecting to db", error);
  }
};

export default connectDB;
