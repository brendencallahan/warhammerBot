# warhammerBot
## Discord music bot with a Warhammer 40k flare.

The bot's name is Ferrus Manus. It was built with discordjs and can provide Warhammer lore on request by reading from a json file and picking at random. It also has YouTube playback built with distube, as well as being hooked up to ChatGPT through the "ask" command. You can provide it with an entire playlist, skip songs, change volume, etc. You will need to rename `config.json.example` to `config.json`.

![image](https://github.com/brendencallahan/warhammerBot/assets/47364240/64313834-9294-46a0-b5f8-400a66967273)

In the `config.json` there are two varialbes you will need to set. The first is the Discord bot token. Create an application, using this link and generate a token under the left hand section "bot".
https://discord.com/developers/applications

The second variable is the "OPEN_API" key for ChatGPT. This can be created at the following link.
https://platform.openai.com/account/api-keys

After you've filled out the variables in `config.json`, build the docker image using `docker build -t warhammer-bot:latest`.

You can then run it using `docker run warhammer-bot`.

The Dockerfile is there, so that it can be easily run as a container; however, if you would like to run it manually you can do so using the following commands:

`$ git clone https://github.com/brendencallahan/warhammerBot`  

`$ cd warhammerBot`  

`Provide keys in config.json`  

`$ npm i`  

`$ node .`
