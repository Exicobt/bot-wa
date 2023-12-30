const toStiker = async function (msg, client) {
  await msg.reply("[⏳]Wait...")
    try {
      const media = await msg.downloadMedia();
      client.sendMessage(msg.from, media, {
        sendMediaAsSticker: true,
        stickerName: "rek",
        stickerAuthor: "Exicobt",
      });
    } catch (error) {
      client.sendMessage("Convert to sticker gagal, coba lagi");
    }
  
}

const toStickerReply = async function (msg, client, quotedMsg) {
  await msg.reply("[⏳]Wait...")

    try {
      const media = await quotedMsg.downloadMedia();
      client.sendMessage(msg.from, media, {
        sendMediaAsSticker: true,
        stickerName: "rek",
        stickerAuthor: "Exicobt",
      });
    } catch (error) {
      client.sendMessage("Convert to sticker gagal, coba lagi")
    }
  
}

const toImage = async function (msg, client) {
    const quotedMsg = await msg.getQuotedMessage()
    await msg.reply("[⏳]Wait...")
    if (quotedMsg && quotedMsg.hasMedia) {
      try {
        const media = await quotedMsg.downloadMedia();
        await client.sendMessage(msg.from, media);
      } catch (error) {
        await client.sendMessage('konversi gagal');
      }
    }
  }
  
module.exports = { toStiker, toImage, toStickerReply };