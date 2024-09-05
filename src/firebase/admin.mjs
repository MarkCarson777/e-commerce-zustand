import admin from "firebase-admin";
import serviceAccount from "/Users/markcarson/Downloads/service-account.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const firestoreAdmin = admin.firestore();

export { firestoreAdmin };
