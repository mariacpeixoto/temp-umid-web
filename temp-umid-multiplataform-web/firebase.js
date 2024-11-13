const admin = require("firebase-admin");
const serviceAccount = require("./temp-umid-multiplataform-firebase-adminsdk-6k2se-3e216a55ec.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
