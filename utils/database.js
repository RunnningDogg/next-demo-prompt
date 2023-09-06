import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'magicphoto'
    });

    console.log("connected to database")

    isConnected = db.connections[0].readyState;

  } catch (error) {
    console.log(error)
  }

}