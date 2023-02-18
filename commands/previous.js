const { stringEmail } = require("@sapphire/shapeshift")

module.exports = {
  name: 'previous',
  description: "Plays the previous song in the queue ",
  verbose: "Typing \`!previous\` will play the previous song in the queue. " +
    "You may also be looking for \`!skip\`.",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !previous`)
    }
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    try {
      const song = await queue.previous()
      return message.channel.send(`${client.emotes.success} | I will now play:\n${song.name}`)
    } catch (error) {
      return message.channel.send(`${client.emotes.error} Heretic! There are no previous songs!`)
    }
  }
}
