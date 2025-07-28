const admin = require("firebase-admin");

const serviceAccount = require("./path-to-your-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (token, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Successfully sent message:", response);
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
};

module.exports = sendPushNotification;
