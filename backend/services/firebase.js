import {admin} from "firebase-admin";
import serviceAccount from "../config/serviceAccountKey.json" assert {type:"json"};

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

export {db,auth}; 