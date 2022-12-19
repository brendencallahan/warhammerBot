module.exports = {
  name: 'leave',
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !leave`)
    }
    client.distube.voices.leave(message)
  }
}