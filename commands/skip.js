module.exports = {
  name: "skip",
  inVoiceChannel: true,
  description: "Skip the current song",
  verbose:
    "Typing `!skip` will end the current song. " +
    "You may also be looking for `!previous`.",
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! You speak too much. Just say \`!skip\`.`
      );
    }
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Heretic! The queue is empty! See \`!help play\` or \`!help search\` to change that.`
      );
    try {
      const song = await queue.skip();
      message.channel.send(
        `${client.emotes.success} | Skipped! I will now play:\n${song.name}`
      );
    } catch (e) {
      message.channel.send(
        `${client.emotes.error} | Heretic! Try again, and ensure you have songs queued.`
      );
    }
  },
};
