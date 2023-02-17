const { EmbedBuilder } = require("@discordjs/builders");
const { SearchResultType } = require("distube");

module.exports = {
  name: "search",
  inVoiceChannel: false,
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! I need something to search for.`
      );
    }
    const results = await client.distube.search(string, {
      limit: 5,
      type: SearchResultType.PLAYLIST,
    });
    if (!results) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! No results found!`
      );
    } else {
      let embeds = [];
      for (let i = 0; i < results.length; i++) {
        let embed = new EmbedBuilder()
          .setTitle(results[i].name)
          .setURL(results[i].url)
          .setAuthor({
            name: `Channel: ${results[i].uploader.name}`,
            url: results[i].uploader.url,
          })
          .setFields(
            { name: "No. of Songs: ", value: `${results[i].length}`},
          );
        embeds.push(embed);
      }
      message.channel.send({ embeds: embeds });
    }
  },
};
