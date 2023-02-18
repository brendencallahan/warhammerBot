module.exports = {
  name: "resume",
  aliases: ["unpause"],
  description: "Resumes the current song",
  verbose: "Typing \`!resume\` or \`!unpause\` will resume the currently playing song. " +
    "It will also pause playback, if the song is already playing. " + 
    "You may also be looking for \`!pause\`.",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! You speak too much. Just say \`!resume\`, or \`!unpause\`.`
      );
    }
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Heretic! The queue is empty! See \`!help play\` or \`!help search\` to change that.`
      );
    if (queue.paused) {
      queue.resume();
      message.channel.send(
        `${client.emotes.success} | Finally, you have returned`
      );
    } else {
      queue.pause();
      message.channel.send(
        `${client.emotes.success} | The Emperor will not wait long!`
      );
    }
  },
};
