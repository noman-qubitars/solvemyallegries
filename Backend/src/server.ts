import { config } from "./config/env";
import { app } from "./app";
import { connectDB } from "./lib/mongoose";

const port = config.port;

connectDB().then(() => {
  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  const handleShutdown = async () => {
    server.close(async () => {
      const { disconnectDB } = await import("./lib/mongoose");
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
});


