module.exports = {
  name: 'stop',
  aliases: ['fullstop'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !stop or !fullstop`)
    }
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    queue.stop()
    message.channel.send(`${client.emotes.success} | Don't keep the Emperor waiting!`)
  }
}