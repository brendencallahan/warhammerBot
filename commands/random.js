const facts = require("../static/facts.json");
let keywords = {};
let settings = {
  warhammer40k: ["imperium", "chaos", "xenos"],
  fantasy: [
    "Grand Alliance: Order",
    "Grand Alliance: Chaos",
    "Grand Alliance: Death",
    "Grand Alliance: Destruction",
  ],
};

// Make map from keywords to index numbers
// {"chaos":[0,5],"imperium":[6,30],"xenos":[31,38]}
// will allow for calling !random "word" and getting only "word" facts
// where "word" is any column defined below
keywords[facts[0].alliance] = [0, 0];
keywords[facts[0].faction] = [0, 0];
keywords[facts[0].subfaction] = [0, 0];
for (let i = 1; i < facts.length; i++) {
  if (facts[i].alliance != facts[i - 1].alliance) {
    keywords[facts[i].alliance] = [i, i];
  } else {
    keywords[facts[i].alliance][1]++;
  }
  if (facts[i].faction != facts[i - 1].faction) {
    keywords[facts[i].faction] = [i, i];
  } else {
    keywords[facts[i].faction][1]++;
  }
  if (facts[i].subfaction != facts[i - 1].subfaction) {
    keywords[facts[i].subfaction] = [i, i];
  } else {
    keywords[facts[i].subfaction][1]++;
  }
}

keywords["40k"] = [keywords["chaos"][0], keywords["xenos"][1]];
try {
  keywords["fantasy"] = [
    keywords["grand alliance: chaos"][0],
    keywords["grand alliance: order"][1],
  ];
} catch (e) {
  console.log(e);
}
delete keywords[""];

module.exports = {
  name: "random",
  aliases: ["fact", "funfact"],
  run: async (client, message, args) => {
    // Print random fact if no faction name is provided
    const string = args.join(" ").toLowerCase();
    const randomFactIndex = (min, max) =>
      Math.floor(Math.random() * (max - min)) + min;
    let factIndex = randomFactIndex(0, facts.length);
    let fact = facts[factIndex];

    if (string) {
      if (string in keywords) {
        factIndex = randomFactIndex(keywords[string][0], keywords[string][1]);
        fact = facts[factIndex];
      } else if (string === "keywords") {
        return message.channel.send(
          `${client.emotes.success} | Ask me about ${JSON.stringify(
            Object.keys(keywords)
          )}`
        );
      } else {
        return message.channel.send(
          `${client.emotes.error} | Heretic! I know nothing of this "${string}"... To see what I know type !random keywords`
        );
      }
    }

    fact.alliance = fact.alliance.charAt(0).toUpperCase() + fact.alliance.slice(1);
    fact.faction = fact.faction.charAt(0).toUpperCase() + fact.faction.slice(1);
    fact.subfaction = fact.subfaction.charAt(0).toUpperCase() + fact.subfaction.slice(1);

    if (fact.fact.includes("Ferrus")) {
      await message.channel.send({
        files: [
          {
            attachment:
              "https://static.wikia.nocookie.net/warhammer40k/images/8/81/Ferrus_Manus_sketch.jpg",
          },
        ],
      });
    }

    return message.channel.send(
      `${client.emotes.success} | Alliance:${fact.alliance} - Faction:${fact.faction} - Subfaction:${fact.subfaction} - Fact:
${fact.fact}`
    );
  },
};
