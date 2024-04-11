import { createLogger, format, transports } from "winston";
import { getProjectPath, getUTCDateFormatYYYYMMDD } from "./utils";
import fs from "fs";


const todayDate = getUTCDateFormatYYYYMMDD();
const projectPath = getProjectPath(); 

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toLocaleUpperCase()} ${message}`;
});

const logPath = `${projectPath}\\logs\\${todayDate}`;
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true });
}

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ filename: logPath + '/requests.log' })
  ],
}); 

export default logger;