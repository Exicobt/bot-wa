const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { toStiker, toImage, toStickerReply } = require('./stiker')
const { quote, jokesRandom, gif, apakah, cakLontong, playMusic } = require('./fun')
const menu = require('./menu')
const { ms } = require('translate-google/languages')

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
  const quotedMsg = await msg.getQuotedMessage();
  
  const stiker = [".sticker", ".stiker", ".s"]
  for (const keyword of stiker) {
  if (msg.body === keyword) {
    if (msg.type === "image" || msg.type === "gif" || msg.type === "video") {
      toStiker(msg, client);
    }
    if (quotedMsg && quotedMsg.hasMedia) {
      toStickerReply(msg, client, quotedMsg);
    }
  }
}

  if (msg.body === ".toimg") {
    toImage(msg, client);
  }

  const how = [
    ".howgay",
    ".howhandsome",
    ".howpretty",
    ".howrich",
    ".howpoor"
  ];

  for (const keyword of how) {
    if (msg.body.startsWith(keyword)) {
      const persen = Math.floor(Math.random() * 100);
      let persentase = msg.body.substring(4)
      const spt = persentase.split(" ")
      if (spt.length > 1) {
        persentase = spt[0]
      }
      try {
        await msg.reply(`${persen}% ${persentase}`);
      } catch (error) {
        await msg.reply("Gagal menghitung");
      }
      break;
    }
  }

  if (msg.body.startsWith(".rate")) {
    const persen = Math.floor(Math.random() * 100)
    try {
      await msg.reply(`${persen}%`)
    } catch (error) {
      await msg.reply("Gagal menghitung")
    }
  }

  if (msg.body.toLowerCase() === "bot") {
    const response = [
      'Apa??',
      'Ya??', 
      'Hadirr', 
      'Ada perlu apa?', 
      'Aku disini, kenapa?',
      'Aduh dicariin',
      'kenapa?'
    ]

    const index = Math.floor(Math.random() * response.length - 1)
    const responseIndex = response[index]
    await client.sendMessage(msg.from, responseIndex);
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
    apakah(msg);
  }

  if (msg.body === ".jokes") {
    jokesRandom(msg);
  }

  if (msg.body === ".quote") {
    quote(msg)
  }

  if (msg.body.startsWith(".hug")) {
    gif(msg, MessageMedia);
  }

  if (msg.body === ".menu") {
    menu(client, msg)
  }

  if (msg.body === ".caklontong") {
    cakLontong(msg)
  }

  if (msg.body.startsWith('.play')) {
    const query = msg.body.substring(6).trim()
    playMusic(query, msg, MessageMedia)
  }
});

client.initialize();
