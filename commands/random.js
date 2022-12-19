const facts = require('../static/facts.json')

module.exports = {
    name: 'random',
    aliases: ['fact', 'funfact'],
    run: async (client, message, args) => {
        // Print random fact if no faction name is provided
        const string = args.join(' ').toLowerCase()
        let factions = []
        for (i in facts) {
            factions.push(i)
        }
        if (!string) {
            var faction = factions[Math.floor(Math.random()*factions.length)]
            var facts_list = facts[faction]
        } else if (factions.includes(string)){
            var faction = string
            var facts_list = facts[faction]
        } else {
            return message.channel.send(`${client.emotes.error} | Heretic! I know nothing of this ${string}.`)
        }
        let random_fact = facts_list[Math.floor(Math.random()*facts_list.length)]
        return message.channel.send(`${client.emotes.success} | ${faction.charAt(0).toUpperCase() + faction.slice(1)} fact: ${random_fact}`)
    }
}
