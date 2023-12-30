const axios = require('axios');
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });

const pin = async function (msg, msgMedia) {
    await msg.reply("[🔍] Searching...");

    try {
        if (msg.body.startsWith('.pin')) {
          const query = msg.body.substring(5).trim();
          const imageUrl = await pinterest(query);
          await sendImage(msg, imageUrl, msgMedia);
        }
      } catch (error) {
        console.error('Error processing message:', error);
        await msg.reply("Tidak dapat menemukan gambar");
      }
}

const pinterest = (wall) => new Promise((resolve, reject) => {
    axios.get('https://fdciabdul.tech/api/pinterest?keyword=' + encodeURIComponent(wall), { httpsAgent: agent })
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      });
  });

  const sendImage = async (message, imageUrl, msgMedia) => {
    try {
      const media = new msgMedia('image/jpeg', await getImageBuffer(imageUrl));
      await message.reply(media);
    } catch (error) {
      console.error('Error sending image:', error);
      throw error;
    }
  };
  
  const getImageBuffer = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer', httpsAgent: agent });
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      console.error('Error getting image buffer:', error);
      throw error;
    }
  };

module.exports = { pin };
