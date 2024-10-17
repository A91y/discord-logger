import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

if (!webhookUrl) {
  throw new Error(
    "Discord Webhook URL is not defined in the environment variables."
  );
}

// Define log levels
type LogLevel = "INFO" | "WARN" | "ERROR";

// Emoji and styling for different log levels
const logStyles = {
  INFO: { emoji: "ℹ️", color: "#00BFFF" }, // Light Blue for INFO
  WARN: { emoji: "⚠️", color: "#FFA500" }, // Orange for WARN
  ERROR: { emoji: "❌", color: "#FF0000" }, // Red for ERROR
};

/**
 * Convert current UTC time to IST.
 * @returns {string} Timestamp in IST
 */
const getISTTimestamp = (): string => {
  const now = new Date();

  // IST is UTC +5:30
  const offsetIST = 5 * 60 + 30; // in minutes
  const istTime = new Date(now.getTime() + offsetIST * 60000);

  return istTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

/**
 * Log a message to Discord with a specific log level.
 * @param message The message to log
 * @param level The log level (INFO, WARN, ERROR)
 */
export const logToDiscord = async (
  message: string,
  level: LogLevel = "INFO"
): Promise<void> => {
  try {
    const timestamp = getISTTimestamp(); // Get IST timestamp
    const { emoji, color } = logStyles[level];

    const payload = {
      content: `${emoji} **[${level}]** [${timestamp} IST]: ${message}`,
      embeds: [
        {
          description: message,
          color: parseInt(color.substring(1), 16), // Convert hex color to decimal for Discord
        },
      ],
    };

    await axios.post(webhookUrl, payload);
    console.log(`Logged to Discord [${level}]: ${message}`);
  } catch (error) {
    console.error("Error logging to Discord:", error);
  }
};
