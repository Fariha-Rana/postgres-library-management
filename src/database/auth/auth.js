// // Example in Node.js/Next.js (using bcrypt and jsonwebtoken)
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // Register new user
// async function registerUser(username, password, role_id, member_id) {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   // Insert user into database with hashedPassword and other details
// }

// // Authenticate user
// async function authenticateUser(username, password) {
//   const user = await findUserByUsername(username); // Retrieve user from database
//   if (user && (await bcrypt.compare(password, user.password_hash))) {
//     const token = jwt.sign(
//       { userId: user.user_id, roleId: user.role_id },
//       "SECRET_KEY"
//     );
//     return token;
//   }
//   throw new Error("Invalid credentials");
// }
console.log("hello");
