const facts = (require('../static/facts.json'))

module.exports = {
    name: 'random',
    aliases: ['fact', 'funfact'],
    run: async (client, message, args) => {
        // Get faction name and print random fact if not provided
        const string = args.join(' ').toLowerCase()
        let factions = []
        for (i in facts) {
            factions.push(i)
        }

        if (!string) {
            var facts_list = facts[factions[Math.floor(Math.random()*factions.length)]]
        }
        else if (factions.includes(string)){
            var facts_list = facts[string]
        }
        else {
            return message.channel.send(`${client.emotes.error} | Heretic! I know nothing of this ${string}.`)
        }

        let random_fact = facts_list[Math.floor(Math.random()*facts_list.length)]
        return message.channel.send(random_fact)
        // Return fact, if found
        /* if (!fact) return message.channel.send(`${client.emotes.error} | Heretic! You know nothing!`)
        return message.channel.send(fact) */
    }
}
