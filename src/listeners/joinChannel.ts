import { Client, VoiceState } from "discord.js";
import {
  joinVoiceChannel,
  DiscordGatewayAdapterCreator,
  VoiceConnectionStatus,
  entersState,
  createAudioResource,
  createAudioPlayer,
} from "@discordjs/voice";
import path from "path";
import fs from "fs";

export default (client: Client): void => {
  client.on(
    "voiceStateUpdate",
    async (oldState: VoiceState, newState: VoiceState) => {
      const player = createAudioPlayer();
      if (newState.channelId && !oldState.channelId) {
        const resource = createAudioResource(
          fs.createReadStream(path.join(__dirname, "custom.mp3")),
          {
            inlineVolume: true,
          }
        );
        const connection = await joinVoiceChannel({
          channelId: newState.channelId,
          guildId: newState.guild.id,
          adapterCreator: newState.guild
            .voiceAdapterCreator as DiscordGatewayAdapterCreator,
        });
        setTimeout(() => {
          if (resource && resource.volume) {
            resource.volume.setVolume(0.7);
            connection.subscribe(player);
            player.play(resource);
          }
        }, 500);
      }
    }
  );
};
