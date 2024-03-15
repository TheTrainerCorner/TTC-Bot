import mongoose from "mongoose";
import { Config } from "./global/config";
import { client } from "./client/core/client";
require("dotenv").config();
require("./server/index");
try {
  (async () => {
    await client.connect();
    await mongoose.connect(Config.MONGODB_CONNECT_URL as string);
  })();
} catch (error) {
  console.log(error);
}
