const express = require("express");
const cors = require("cors");
const app = express();
const crypto = require("crypto"); // crypto comes with Node.js

/* Copied the JWT app creds of my account */
const apiKey = "";
const apiSecret = "";

app.use(cors());
app.use(express.json());
app.listen(5000, () => console.log("server listening on port 5000"));

app.get("/", (req, res) => {
    res.send("home route");
    res.end();
});

app.post("/zoom", async (req, res) => {
    const body = req.body;
    const signature = generateSignature(body.meetId, body.role);
    console.log("sign ", signature);
    res.send({ signature, apiKey });
    res.end();
});

function generateSignature(meetingNumber, role) {
    // Prevent time sync issue between client signature generation and zoom
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
        "base64"
    );
    const hash = crypto
        .createHmac("sha256", apiSecret)
        .update(msg)
        .digest("base64");
    const signature = Buffer.from(
        `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString("base64");

    return signature;
}
