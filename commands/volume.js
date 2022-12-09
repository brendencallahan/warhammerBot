module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Enter a valid number or be slain!`)
    queue.setVolume(volume)
    message.channel.send(`${client.emotes.success} | Triumphant yelling set to \`${volume}\``)
  }
}