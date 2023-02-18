module.exports = {
  name: 'play',
  aliases: ['p'],
  description: "Searches YouTube and plays request",
  verbose: "Typing \`!play\` or \`!p\`, followed by a \`query\`, will play the first result from YouTube. " +
    "If you wish to play a playlist you may either copy+paste from a browser, or more conveniently, " + 
    "you can you the \`!search\` command which will return only playlists. " + 
    "You may also be looking for \`!stop\`. (Note: \`!stop\` will delete the queue)",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Heretic! Enter a url or query to start playing. See \`!help play\` for more info.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}
