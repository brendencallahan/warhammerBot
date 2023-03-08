module.exports = {
  name: "autoplay",
  inVoiceChannel: true,
  description: "Automagically add songs to queue",
  verbose:
    "Typing `!autoplay` will toggle automatically adding songs to the queue. " +
    "Using (definitely not A.I.) I will try to add songs to the queue that are " +
    "similar to the songs previous.",
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! You speak too much. Just say \`!autoplay\`.`
      );
    }
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Heretic! The queue is empty! See \`!help play\` or \`!help search\` to change that.`
      );
    const autoplay = queue.toggleAutoplay();
    message.channel.send(
      `${client.emotes.success} | AutoPlay: \`${autoplay ? "On" : "Off"}\``
    );
  },
};
