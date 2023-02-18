const { Constants } = require('discord.js')

module.exports = {
  name: 'join',
  aliases: ['move'],
  description: "Joins the voice channel",
  verbose: "Typing \`!join\` will have me join whatever voice channel you're currently in. " + 
    "If you are wanting me to leave, try the \`!leave\` command.",
  run: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      try {
        voiceChannel = await client.channels.fetch(args[0])
      } catch (error) {
        return message.channel.send(`${client.emotes.error} | Heretic! ${args[0]} is not valid. Your heresy will be remembered!`)
      }
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`${client.emotes.error} | Heretic! ${args[0]} is not valid. Your heresy will be remembered!`)
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `${client.emotes.error} | To summon me, you must be in a voice channel or provide an ID!`
      )
    }
    client.distube.voices.join(voiceChannel)
  }
}
