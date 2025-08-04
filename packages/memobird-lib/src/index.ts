import { memoBirdPrint } from "./print";
import { renderTextAutoWrap } from "./drawCall";
import { App } from "@slack/bolt";
import "dotenv/config";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Listens to incoming messages that contain "hello"
app.message("ping", async ({ message, say }) => {
  if ("user" in message) {
    await say(`pong <@${message.user}>!`);
    const canvas = renderTextAutoWrap(
      `Ping from ${message.user} at ${new Date().toLocaleString()}`
    );
    memoBirdPrint(canvas);
  } else {
    await say(`pong!`);
  }
});

app.command("/memo", async ({ ack, body, respond, client }) => {
  await ack();
  try {
    const signatureName = (
      await client.users.info({
        user: body.user_id,
      })
    ).user?.profile?.display_name;
    const canvas = renderTextAutoWrap(body.text, {
      signatureName,
    });
    await memoBirdPrint(canvas);
    await respond("咕咕");
  } catch (error) {
    await respond("咕咕失败: " + error.message);
  }
});

app.command("/anonymemo", async ({ ack, body, respond, client }) => {
  await ack();
  try {
    const canvas = renderTextAutoWrap(body.text, {
      enableSignature: false,
    });
    await memoBirdPrint(canvas);
    await respond("咕咕");
  } catch (error) {
    await respond("咕咕失败: " + error.message);
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Duo is live!");
})();
