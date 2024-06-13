const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const express = require("express");
const Routes = require("./routes");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const sessionString = process.env.SESSION || "";

const stringSession = new StringSession(sessionString);

async function startTelegramClient() {
  try {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });

    await client.start({
      phoneNumber: async () =>
        await input.text("Please enter your phone number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });

    console.log("You are now connected.");
    console.log("Session string:", client.session.save());

    Routes(client, router);
  } catch (error) {
    console.error("Error starting Telegram client:", error);
  }
}

module.exports = {
  startTelegramClient,
  router,
};
