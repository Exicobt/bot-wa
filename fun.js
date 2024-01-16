const translate = require('translate-google')
const tts = require('./dataTTSCL')
const { ms } = require('translate-google/languages')

const apakah = async function(msg) {
    const answer = ['Tidak', 'Tidak mungkin', 'Mungkin saja', 'Sepertinya', 'Sudah pasti', 'Belum pasti', 'Tentu saja', 'Mustahil', 'Iya']
    const index = Math.floor(Math.random()*answer.length)
    const real = answer[index]

    await msg.reply(real)
}

const jokesRandom = async (msg) => {
    try {
        fetch("https://v2.jokeapi.dev/joke/Any?")
        .then(res => res.json())
        .then(res => {
            let joke;

            if (res.type === 'twopart') {
                joke = `Q: ${res.setup}\nA: ${res.delivery}`
            } else {
                joke = res.joke
            }

            translate(joke, {from: 'en', to: 'id'})
            .then((res) => msg.reply(`${res}\nSangat mengocok perut😹😹😹`))
        })
    } catch (error) {
        console.error(error.message)
        msg.reply('Gagal memuat jokes, coba lagi')
    }
};  

const quote = async (msg) => {
    try {
        const response = await fetch("https://api.adviceslip.com/advice")
        const data = await response.json()

        const word = data.slip.advice

        await translate(word, {from: 'en', to: 'id'})
        .then(res => msg.reply(`"${res}"`))
        
    } catch(error) {
        await msg.reply('Terjadi kesalahan saat mencari kata, coba lagi')
        console.error(error.message)
    }
}

const gif = async (msg, msgMedia) => {
    try {
      const response = await fetch("https://api.giphy.com/v1/gifs/random?api_key=KgXMopyqpi85rQsjZ0VKFsEubBXCD8H8&tag=anime+hug&rating=g");
      const data = await response.json();
  
      if (data.data && data.data.images.original.webp) {
        const gifUrl = data.data.images.original.webp;
        const media = msgMedia.fromUrl(gifUrl)
        console.log(media)

        await msg.reply(media, {
          sendMediaAsSticker: true,
          stickerName: 'rek',
          stickerAuthor: 'Exicobt',
        });
      } else {
        console.error('GIF data not found in the response.');
      }
    } catch (error) {
      console.error(error.message);
      await msg.reply('Gagal memuat, coba lagi');
    }
  };

  const cakLontong = async (msg) => {
    const index = Math.floor(Math.random() * tts.length)
    const game = tts[index]
    const pertanyaan = game['pertanyaan']
    const jawaban = game['jawaban']
    const komentar = game['komentar']
  
    await msg.reply(pertanyaan)
  
    let waktu = 30
    let isGame = true
  
    const detik = setInterval(() => {
      waktu--
  
      if (waktu === 0) {
        clearInterval(detik)
        isGame = false
        msg.reply(`Yahh waktunya sudah habis, jadi jawabannya adalah ${jawaban}\n${komentar}`)
      }
    }, 1000);
  
    const messageListener = async (response) => {
      if (isGame && response.from === msg.from) {
        const input = response.body.toLowerCase(); 
  
        if (input === jawaban.toLowerCase()) {
          clearInterval(detik);
          isGame = false;
          await msg.reply(`Benar, ${komentar}`);
        } else {
          await msg.reply("Jawabanmu masih salah, coba lagi");
        }
      }
    };
  
    msg.client.on('message', messageListener);
  
    msg.client.on('message', async (response) => {
      if (!isGame && response.from === msg.from) {
        msg.client.removeListener('message', messageListener);
      }
    });
  };
  
 const playMusic = async (query, msg, msgMedia) => {
  const access_token = 'BQBp4WaVyBFZ5ARh3VaRqXBp5Ameetq-12nuOBvhfDWsySl7Fw4PI-Nyyq7A6qKc29uf5vYEQRE9-pgVuw19JughKaYaG-dhJqCacrGQHX6n55I5IHqkojmfHJrWctreHv1kG9yHZWp7yAxbqXivz6XdCEhCIFoIPX4mYTeCWgn8Ysc5ru_MRk9SRu9KERk37Jo'
  
  try {
    await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
      method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
    }).then(res => res.json()).then(res => {
      const url = res.tracks.items[0].external_urls.spotify
      const audio = msgMedia.fromUrl(url, { contentType: 'audio/mp3', unsafeMime: true })
      console.log(audio)

      msg.reply(audio)
    })

   } catch(err) {
    console.error(err.message), await msg.reply('Gagal mengirim lagu')
   }
  }

  module.exports = {jokesRandom, gif, apakah, quote, cakLontong, playMusic}