# warhammerBot
## Discord music bot with a Warhammer 40k flare.

The bot's name is Ferrus Manus. It was built with discordjs and can provide Warhammer lore on request by reading from a json file and picking at random. It also has YouTube playback built with distube, as well as being hooked up to ChatGPT through the "ask" command. You can provide it with an entire playlist, skip songs, change volume, etc. You will need to create a `config.json` following the `config.example.json`. There is a Dockerfile, so that it can be run as a container; however, if you would like to run it manually you can do so using the following commands.

`$ git clone https://github.com/brendencallahan/warhammerBot`  

`$ cd warhammerBot`  

`Provide keys in config.json`  

`$ npm i`  

`$ node .`
