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

            let random_faction = factions[Math.floor(Math.random()*factions.length)]

            console.log(random_faction)

            let random_fact = facts[random_faction]
            console.log(random_fact[0])

            return message.channel.send("hmm")
        }


        // Get fact from argument provided faction




        // Return fact, if found
        /* if (!fact) return message.channel.send(`${client.emotes.error} | Heretic! You know nothing!`)
        return message.channel.send(fact) */
    }
}