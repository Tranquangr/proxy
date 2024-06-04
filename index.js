const express = require("express");
const axios = require("axios");
const app = express();
const port = 8080;

const CLIENT_ID =
  "Y869487743288-p9v1d0gsd9htpj36d4fdiq22u7ea2ing.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://truyentranhpl.com/google-login-callback"; // URL chuyển hướng của plugin WordPress

app.get("/auth", (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/analytics.readonly`;
  res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  const tokenUrl = "https://oauth2.googleapis.com/token";
  const params = {
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post(tokenUrl, null, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
