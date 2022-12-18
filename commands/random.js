const facts = (require('../static/facts.json'))

module.exports = {
    name: 'random',
    aliases: ['fact', 'funfact'],
    run: async (client, message, args) => {


        // Get faction name and print random fact if not provided
        const string = args.join(' ')
        if (!string) {
            let factions = []
            for (i in facts) {
                factions.push(i)
            }

            let random_facts_list = facts[factions[Math.floor(Math.random()*factions.length)]]
            let random_fact = random_facts_list[Math.floor(Math.random()*random_facts_list.length)]

            return message.channel.send(random_fact)

        }


        // Get fact from argument provided faction




        // Return fact, if found
        /* if (!fact) return message.channel.send(`${client.emotes.error} | Heretic! You know nothing!`)
        return message.channel.send(fact) */
    }
}
