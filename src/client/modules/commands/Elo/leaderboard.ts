import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {BaseCommand} from "../../../bases/BaseCommand";
import CommandContext from "../../../contexts/CommandContext";
import Player from "../../../../database/models/player";
export default class LeaderboardCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('leaderboard')
                .setDescription('Displays the Top 15 players in ELO')
        );
    }

    public async invoke(ctx: CommandContext) {

        const players = await Player.find();

        const sorted = players.sort((a, b) => (b.elo - a.elo));

        const embed = new EmbedBuilder();
        embed.setTitle('Leaderboard');
        embed.setColor('Random');
        for(let i = 0; i < (sorted.length >= 15 ? 15 : sorted.length); i++) {
            embed.addFields([
                { name: `${sorted[i].showdownUsername} - ELO: ${sorted[i].elo}`, value: `Discord: <@${sorted[i].discordId}>\nWins: ${sorted[i].wins}\nLosses: ${sorted[i].losses}\nMatches Played: ${sorted[i].matchesPlayed}`},
            ])
        }

        await ctx.sendMessageToReply({
            embeds: [embed]
        });

        
    }
}