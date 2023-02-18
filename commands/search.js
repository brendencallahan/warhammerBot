const { EmbedBuilder } = require("@discordjs/builders");
const { SearchResultType } = require("distube");

module.exports = {
  name: "search",
  inVoiceChannel: false,
  description: "Searches YouTube for playlists",
  verbose: "Typing \`!search\` followed by your \`query\` will search YouTube for " +
    "playlists and return the first 5 results. " +
    "This was made so that you can easily make a playlist (without leaving Discord). " + 
    "You may also be looking for \`!play\` which will play the top song result.",
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! I need something to search for. Say \`!search query\` or use \`!help seach\` to see more.`
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
            { name: "No. of Songs: ", value: `${results[i].length}`, inline: true},
            { name: "URL:", value: `${results[i].url}`, inline: true},
          );
        embeds.push(embed);
      }
      message.channel.send({ embeds: embeds });
    }
  },
};
