import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT_SERVER;

app
  .listen(port, () => {
    console.log(`✅ Server is running on: http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("❌ Failed to start server:", err);
  });
