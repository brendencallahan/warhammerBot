module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  description: "Returns the name of current song",
  verbose:
    "Typing `!nowplaying` or `!np` will return the currently playing song. " +
    "It will also return the name of the person that requested the song " +
    "To get a list of the current queue, you can use `!queue`.",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! You speak too much. Just say \`!nowplaying\`, or \`!np\`.`
      );
    }
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Heretic! There is nothing playing! See \`!help play\` or \`!help search\` to change that.`
      );
    const song = queue.songs[0];
    message.channel.send(
      `${client.emotes.play} | You fool, I'm playing **\`${song.name}\`**, requested by ${song.user}`
    );
  },
};
