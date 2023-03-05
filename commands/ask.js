const axios = require("axios");
const { OPEN_API } = require("../config.json");
let messages = require("../static/memory.json");
const fs = require("fs");

module.exports = {
  name: "ask",
  description: "Uses *definitely not AI* to answer your question",
  verbose:
    "Typing `!ask` followed by a `query`, will ask Ferrus the question. " +
    "Ferrus will remember everything you say, until you use \`!ask cm\`." +
    "This is *definitely not AI* but be sure to keep that between us.",
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! Enter a url or query to start playing. See \`!help play\` for more info.`
      );
    }

    if (string === "cm") {
      //early return if clearing memory
      messages = [messages.shift()];
      fs.writeFile("static/memory.json", JSON.stringify(messages), (error) => {
        if (error) {
          console.log(error);
        }
      });
      return message.channel.send(
        `${client.emotes.success} | Wait... what did you say?`
      );
    }

    messages.push({
      role: "user",
      content: string,
    });

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_API}`,
      },
      url: "https://api.openai.com/v1/chat/completions",
      data: {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0,
        max_tokens: 350,
      },
    })
      .then((resp) => {
        messages.push({
          role: "assistant",
          content: resp.data.choices[0].message.content,
        });
        fs.writeFile(
          "static/memory.json",
          JSON.stringify(messages),
          (error) => {
            if (error) {
              console.log(error);
            }
          }
        );
        return message.channel.send(
          `${client.emotes.success} | ${resp.data.choices[0].message.content}`
        );
      })
      .catch((error) => {
        return message.channel.send(
          `${client.emotes.error} | ${error.response.data.error.message}`
        );
      });
  },
};
