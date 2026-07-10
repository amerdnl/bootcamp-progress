import jwt from "jsonwebtoken";

const secretKey = "!@#$%^&*()";

const token = jwt.sign({ userid: "ameer", role: "admin" }, secretKey, {
  expiresIn: "1h",
});

console.log("output token: ", token);

try {
  const decode = jwt.verify(token, secretKey);
  console.log("token verified: ", decode);
} catch (error) {
  console.error("token verification failed: ", error);
}
