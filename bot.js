const { Client, LocalAuth} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { sticker, toStiker, toImage, toStickerReply } = require("./stiker")
const { fun, apakah, jokesRandom } = require("./fun")

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  const quotedMsg = await msg.getQuotedMessage()

  if (msg.body === ".sticker") {
    if (msg.type === "image" || msg.type === "gif" || msg.type === "video") {
        toStiker(msg, client)
    }
    if (quotedMsg && quotedMsg.hasMedia) {
        toStickerReply(msg, client, quotedMsg)
    }
  }
  
  if (msg.body === ".toimg") {
    toImage(msg, client)
  }

  if (msg.body.startsWith(".howgay")) {
    const persen = Math.floor(Math.random() * 100)
    try {
        await msg.reply(`${persen}% gay`)

    } catch(error) {
        await msg.reply("Coba lagi")
    }
  }

  if (msg.body.toLowerCase() === "bot") {
    await client.sendMessage(msg.from, "Apa??");
  }

  if (msg.body === "@everyone") {
    const chat = await msg.getChat();

    let text = "";
    let mentions = [];

    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);
      mentions.push(contact);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  }

  if (msg.body.startsWith(".apakah")) {
    apakah(msg)
  }

  if (msg.body === ".jokes") {
    jokesRandom(msg)
  }

});

client.initialize();
