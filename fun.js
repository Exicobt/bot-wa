const translate = require('translate-google')

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

            translate(joke, {from: 'en', to: 'id'}).then()
            .then((res) => msg.reply(res))
        })
    } catch (error) {
        console.error(error.message)
        msg.reply('Gagal memuat jokes, coba lagi')
    }
};  

module.exports = {apakah, jokesRandom}