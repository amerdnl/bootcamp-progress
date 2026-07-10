import bcrypt from "bcrypt";

const password = "ameer123";
const saltRounds = 10;

async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log("this is the the variable: ", hashed);
  return hashed;
}

async function verifyPassword(inputPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  console.log("the password is : ", isMatch);
  return isMatch;
}

async function runExample() {
  const hashed = await hashPassword(password);
  await verifyPassword("amer123", hashed);
  await verifyPassword("ameer123", hashed);
}

runExample();
