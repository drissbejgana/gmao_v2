import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || "");
    }
  };
