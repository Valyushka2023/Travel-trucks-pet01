

import { setupServer } from "./server.js";
import { initMongoDB} from "./db/initMongoDB.js";

const bootstrap = async () => {
  try {

    await initMongoDB();
    console.log("MongoDB connection established");

    setupServer();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

bootstrap();
