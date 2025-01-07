import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { BaseCommand } from "../../../bases/BaseCommand";
import CommandContext from "../../../contexts/CommandContext";
import Player from "../../../../database/models/player";

export default class EloCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('elo')
                .setDescription('Gets your elo')
        );
    }


    public async invoke(ctx: CommandContext) {
        const players = await Player.find({ discordId: ctx.interaction.user.id});

        if (!players) {
            await ctx.sendMessageToReply({
                ephemeral: true,
                content: `You will need to use the register command to be associated with a showdown user.`,
            });
            return;
        }
        const embed = new EmbedBuilder();
        embed.setTitle(`ELO`);
        embed.setAuthor({
            name: ctx.interaction.user.username,
            iconURL: ctx.interaction.user.displayAvatarURL(),
        });
        console.log(players);
        for(const player of players) {
            embed.addFields([
                {name: `${player.showdownUsername}`, value: `**ELO: ${player.elo}**\nWins: ${player.wins}\nLosses: ${player.losses}\nMatches Played: ${player.matchesPlayed}`},
            ]);
        }

        embed.setColor('Random');
        await ctx.sendMessageToReply({ embeds: [embed] });
    }
}