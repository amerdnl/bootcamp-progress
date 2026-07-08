const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
  console.log("logs directory completed!");
}

const logFile = path.join(logDir, "log.txt");
const dataFile = path.join(logDir, "data.json");

function writeLog(message) {
  const time = new Date().toISOString();
  const log = `[${time} ${message}\n]`;
  fs.appendFileSync(logFile, log);
}

function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

function readData() {
  if (!fs.existsSync(dataFile)) {
    return [];
  }

  const file = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(file);
}

writeLog("Program start");

let users = readData();

users.push({
  name: "Ameer",
  age: 23,
});

saveData(users);
writeLog("User addition completed");
console.log("current data: ", users);
