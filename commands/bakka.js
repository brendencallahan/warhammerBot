module.exports = {
  name: 'bakka',
  description: 'bakka',
  verbose: 'bakka',
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !bakka`)
    }
    return message.channel.send(`${client.emotes.success} | Bakka bakka indeed!`)
  }
}
