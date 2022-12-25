const facts = require('../static/facts.json')

module.exports = {
    name: 'random',
    aliases: ['fact', 'funfact'],
    run: async (client, message, args) => {
        // Print random fact if no faction name is provided
        const string = args.join(' ').toLowerCase()
        let factions = []
        for (let i in facts) {
            factions.push(i)
        }
        if (!string) {
            var faction = factions[Math.floor(Math.random()*factions.length)]
            var facts_list = facts[faction]
        } else if (factions.includes(string)){
            var faction = string
            var facts_list = facts[faction]
        } else if (string === 'list' || string === 'factions'){
            return message.channel.send(`${client.emotes.success} | Ask me anything about ${factions}`)
        } else {
            return message.channel.send(`${client.emotes.error} | Heretic! I know nothing of this ${string}. To see what I know of, use !random list or !random factions`)
        }
        let random_fact = facts_list[Math.floor(Math.random()*facts_list.length)]
        if (random_fact.includes('Ferrus')) {
            await message.channel.send({files: [{ attachment: "https://static.wikia.nocookie.net/warhammer40k/images/8/81/Ferrus_Manus_sketch.jpg" }] })
        }
        return message.channel.send(`${client.emotes.success} | ${faction.charAt(0).toUpperCase() + faction.slice(1)} fact: ${random_fact}`)
    }
}
