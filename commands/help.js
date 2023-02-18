const Discord = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "cmd", "command"],
  description: "Returns this menu",
  verbose: "... wait... how'd you get here?",
  run: async (client, message, args) => {
    const string = args.join(" ");
    let commandList = {};
    client.commands
      .map((cmd) => {
        if (cmd.description != undefined && cmd.verbose != undefined) {
          commandList[cmd.name] = { short: cmd.description, long: cmd.verbose };
        } else {
          commandList[cmd.name] = { short: "tmp", long: "verbose tmp" };
        }
      })
      .join(", ");

    if (string in commandList) {
      return message.channel.send(
        `${client.emotes.success} | Command: \`${string}\` |
Description: ${commandList[string].long}`
      );
    } else if (string && string in commandList === false) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! You speak too much. Just say !help, !h, !cmd, or !command`
      );
    } else {
      let returnString = "";
      for (let tmpcmd in commandList) {
        returnString += `\`!${tmpcmd}\`: ${commandList[tmpcmd].short}\n`;
      }

      message.channel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle("Commands: for more info \`!help command\`")
            .setDescription(returnString)
            .setColor("BLURPLE"),
        ],
      });
    }
  },
};
