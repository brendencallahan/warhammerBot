const { ModalAssertions } = require("discord.js")

module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const string = args.join(' ').toLowerCase()
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! There is nothing playing!`)
    let mode = null
    let modes = ['off', 'song', 'queue']
    if (!modes.includes(string)) {
      return message.channel.send(`${client.emotes.error} | Heretic! You must specify what to repeat. Try !repeat off, !repeat song, or !repeat queue.`)
    }
    switch (string) {
      case 'off':
        mode = 0
        break
      case 'song':
        mode = 1
        break
      case 'queue':
        mode = 2
        break
    }
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
    message.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``)
  }
}