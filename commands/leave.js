module.exports = {
  name: "leave",
  description: "Leaves the voice channel",
  verbose:
    "Typing `!leave` will have me leave whatever voice channel I'm currently in. " +
    "If you are wanting me to join, try the `!join` command.",
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! You speak too much. Just say \`!leave\`.`
      );
    }
    client.distube.voices.leave(message);
  },
};
