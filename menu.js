const text = () => {
   return `
*SELAMAT DATANG DI EXICOBT BOT*

*INFO BOT:*
Nama: Exicobt
Creator: @naufal_alftih
Bahasa: Node.js

Beberapa Command yang bisa kalian pakai:
|---@everyone
|---.sticker
|---.toimg
|---.jokes
|---.quote
|---.howgay
|---.howhandsome
|---.howpretty
|---.howrich
|---.howpoor
|---.rate
|---.apakah
|---.caklontong

Segitu saja karena bot masih dalah perkembangan ^_^
Terimakasih karena sudah memakai Exicobt bot
   `
}

const menu = async (client, msg) => {
    await client.sendMessage(msg.from, text())
}

module.exports = menu