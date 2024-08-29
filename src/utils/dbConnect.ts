import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export const db = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1); 
  }

  try {
    const db = await mongoose.connect(mongoUri, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Database is connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); 
  }
};
