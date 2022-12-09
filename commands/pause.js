module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    if (queue.paused) {
      queue.resume()
      return message.channel.send('Finally, you have returned')
    }
    queue.pause()
    message.channel.send('The Emperor will not wait long!')
  }
}