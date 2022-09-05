import "dotenv/config";

import { ConnectOptions, connect } from "mongoose";

const dbUrl: string = process.env.MONGO_URI || "";
const dbOptions: ConnectOptions = {};
const dbConnect = async () => {
  try {
    await connect(dbUrl, dbOptions);
    console.log("Database connected at: ", dbUrl);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
