import { admin } from "../services/firebase.js";
// import { getAuth } from "firebase/auth";

export const verifyToken = async (req, res, next) => {
  console.log("[LOG] verifyToken middleware triggered");
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = header.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // contains uid, email, etc.
    console.log("[LOG] Token verified for user:", decodedToken.email);
    next();
  } catch (err) {
    console.error("[ERROR] Token verification failed:", err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};