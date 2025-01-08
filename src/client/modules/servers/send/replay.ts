import { TextChannel, EmbedBuilder } from "discord.js";
import { IReplay } from "../../../../database/models/replay";
import ReplayChannels from "../../../../database/models/replayChannel";
import BaseServerEvent from "../../../bases/BaseServerEvent";
import { client } from "../../../core/client";
import { Analyzer } from "../../../core/analyzer";
import Handler from "../../../utils/handler";

export default class SendReplayServerEvent extends BaseServerEvent {
  constructor() {
    super("sendReplay", false);
  }

  public async invoke(data: IReplay) {
    console.log(data);
    const replayChannel = await ReplayChannels.findOne({
      format_id: data.format,
    });

    if (!replayChannel) return;

    const channel = (await client.discord.channels.fetch(
      replayChannel.channel_id
    )) as TextChannel;


    const embed = new EmbedBuilder();

    const analyzer = new Analyzer();
    const isDone = analyzer.analyze(data.log);
    embed.setTitle(`${data.players[0]} vs ${data.players[1]}`);
    embed.setURL(`https://replay.thetrainercorner.net/replays/ttc/${data.id}`);
    embed.setColor(`Green`);
    const analyze = analyzer.data;
    
    switch (data.format) {
      case "[Gen 9] National Dex Randoms":
        await new Handler().handleMonitors('elo', analyzer);
        break;
    }

    if (!channel) return;
    if (isDone) {
      let str = "";
      str += `||Winner: ${analyze.winner}\n`;
      let score = analyze.p1.pokemon.length;
      analyze.p1.pokemon.forEach((x) => {
        if (x.isDead) score -= 1;
      });
      str += "Score: ";
      str += `${score}`;
      str += "-";
      score = analyze.p2.pokemon.length;
      analyze.p2.pokemon.forEach((x) => {
        if (x.isDead) score -= 1;
      });

      str += `${score}||`;
      str += "\n";
      str += "\n";
      str += `${analyze.p1.username}\n||`;
      analyze.p1.pokemon.forEach((x) => {
        str += `${x.pokemon} | ${x.kills} kills | Death: ${
          x.isDead ? "❌" : "✅"
        }\n`;
      });
      str += "||\n";
      str += `${analyze.p2.username}\n||`;
      analyze.p2.pokemon.forEach((x) => {
        str += `${x.pokemon} | ${x.kills} kills | Death: ${
          x.isDead ? "❌" : "✅"
        }\n`;
      });
      str += "||";
      embed.setDescription(str);
      await channel.send({ embeds: [embed] });
    }
  }
}
