module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: "Lists the queue",
  verbose: "Typing \`!queue\` or \`!q\` will return a list of the current songs in the queue. " +
  "If there are too many songs to fit in a Discord message, the middle portion will be cut off. " +
  "(Note: \`!stop\` will delete the current queue.)",
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !queue, or !q. To add to the queue use !play "query"`)
    }
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    var q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')

    if (q.length > 1750) {
      q_first = q.slice(0, 1100)
      q_last = q.slice(q.length - 650)
      q = (`
      ${q_first}
      .
      .
      .
      ${q_last}`)
    }
    message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`)
  }
}
