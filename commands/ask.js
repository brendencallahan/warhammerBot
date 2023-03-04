const axios = require("axios");
const { OPEN_API } = require("../config.json")

module.exports = {
  name: "ask",
  description: "Uses *definitely not AI* to answer your question",
  verbose:
    "Typing `!ask` followed by a `query`, will ask Ferrus the question. " +
    "This is *definitely not AI* but be sure to keep this between us.",
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string) {
      return message.channel.send(
        `${client.emotes.error} | Heretic! Enter a url or query to start playing. See \`!help play\` for more info.`
      );
    }

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_API}`,
      },
      url: "https://api.openai.com/v1/chat/completions",
      data: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Ferrus Manus of the Warhammer 40k universe",
          },
          { role: "user", content: `${string}` },
        ],
        temperature: 0,
        max_tokens: 350,
      },
    })
      .then((resp) => {
        return message.channel.send(
          `${client.emotes.success} | ${resp.data.choices[0].message.content}`
        );
      })
      .catch((error) => {
        return message.channel.send(
          `${client.emotes.success} | ${error.response.data.error.message}`
        );
      });
  },
};
