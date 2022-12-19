module.exports = {
  name: 'resume',
  aliases: ['unpause'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !resume, or !unpause`)
    }
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Finally, you have returned')
    } else {
      queue.pause()
      message.channel.send('The Emperor will not wait long!')
    }
  }
}