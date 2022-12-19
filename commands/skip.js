module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !skip`)
    }
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    try {
      const song = await queue.skip()
      message.channel.send(`${client.emotes.success} | Skipped! I will now play:\n${song.name}`)
    } catch (e) {
      message.channel.send(`${client.emotes.error} | Heretic! It appears there was an error. Try again, and ensure you have songs queued.`)
    }
  }
}