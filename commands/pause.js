module.exports = {
  name: 'pause',
  aliases: ['hold'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !pause, or !hold`)
    }
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    if (queue.paused) {
      queue.resume()
      return message.channel.send(`${client.emotes.success} | Finally, you have returned`)
    }
    queue.pause()
    message.channel.send(`${client.emotes.success} | The Emperor will not wait long!`)
  }
}