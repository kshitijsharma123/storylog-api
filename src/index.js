import { app } from "./app.js";
import { connectDB } from "./db/index.js";

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log({ serverLive: true, PORT });
  });
});

