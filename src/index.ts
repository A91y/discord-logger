import { logToDiscord } from "./logger";

const main = async () => {
  try {
    // INFO level log
    await logToDiscord("🚀 App started successfully!", "INFO");

    // Simulate a warning
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    await logToDiscord("⚠️ Low disk space warning.", "WARN");

    // Simulate an error
    await logToDiscord(
      "❌ Critical error: Cannot connect to database!",
      "ERROR"
    );
  } catch (error) {
    await logToDiscord(
      `❌ Error occurred: ${(error as Error).message}`,
      "ERROR"
    );
  }
};

main();
