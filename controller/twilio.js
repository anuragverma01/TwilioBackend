const dotenv = require("dotenv");
dotenv.config();

const twilioToken = (req, res) => {
  try {
    const identity = req.body.username;
    if (identity) {
      const AccessToken = require("twilio").jwt.AccessToken;
      const ChatGrant = AccessToken.ChatGrant;
      const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioApiKey = process.env.TWILIO_API_KEY;
      const twilioApiSecret = process.env.TWILIO_API_SECRET;

      // Create Chat Grant
      const chatGrant = new ChatGrant({
        serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
      });

      // Create an access token which we will sign and return to the client,
      const token = new AccessToken(
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret,
        {
          identity: identity,
        }
      );
      if (token) {
        token.addGrant(chatGrant);
        // Serialize the token to a JWT string
        const twilioToken = token.toJwt();
        console.log(token.toJwt());
        res.status(200).json({
          twilioToken,
        });
      } else {
        res.status(200).json({
          message: "An occured while creating token",
        });
      }
    } else {
      res.status(200).json({
        message: "Please send valid identity with request",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = twilioToken;
