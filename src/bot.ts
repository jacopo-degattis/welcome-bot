import { Client, Intents } from "discord.js";
import * as listeners from "./listeners";

const addListeners = (client: Client) => {
  Object.entries(listeners).forEach(([key, listener]) => listener(client));
};

const main: () => void = async () => {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
  });
  addListeners(client);
  client.login(process.env.TOKEN);
};

main();
