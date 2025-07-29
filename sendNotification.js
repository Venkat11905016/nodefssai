const admin = require("firebase-admin");

const serviceAccount = require("./path-to-your-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (token, title, body) => {
  // const message = {
  //   notification: {
  //     title,
  //     body,
  //   },
  //   token,
  // };
  // const message = {
  //   token,
  //   notification: {
  //     title,
  //     body,
  //   },
  //   webpush: {
  //     notification: {
  //       title,
  //       body,
  //       icon: "/logo192.png",
  //     },
  //   },
  // };
  const message = {
    token,
    notification: {
      title,
      body,
    },
    webpush: {
      notification: {
        title,
        body,
        icon: "https://nodefssai-2.onrender.com/logo192.png", // ✅ FULL URL required
        click_action: "https://nodefssai-2.onrender.com", // ✅ optional but good UX
      },
      fcmOptions: {
        link: "https://nodefssai-2.onrender.com", // ✅ required for Android to open app
      },
    },
  };
  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Successfully sent message:", response);
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
};

module.exports = sendPushNotification;
