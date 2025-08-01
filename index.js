const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Initialize Firebase Admin with service account
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✅ API to send notification
app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;

  // const message = {
  //   notification: {
  //     title,
  //     body,
  //   },
  //   token,
  //   webpush: {
  //     notification: {
  //       title,
  //       body,
  //       icon: "https://nodefssai-2.onrender.com/logo192.png", // Full HTTPS path is required
  //       click_action: "https://nodefssai-2.onrender.com", // Required to make notification clickable
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
        icon: "https://nodefssai-2.onrender.com/logo192.png", // ✅ Must be full URL
        click_action: "https://nodefssai-2.onrender.com", // ✅ Must be full URL
      },
      fcmOptions: {
        link: "https://nodefssai-2.onrender.com", // ✅ Android Chrome requires this for correct click behavior
      },
    },
  };
  // hit inds
  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Message sent success:", response);
    res.status(200).json({ success: true, response });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Notification failed.", err });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
