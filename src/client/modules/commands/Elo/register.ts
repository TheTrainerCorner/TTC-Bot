import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { BaseCommand } from "../../../bases/BaseCommand";
import CommandContext from "../../../contexts/CommandContext";
import Player from "../../../../database/models/player";
export default class RegisterCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('register')
                .setDescription('Allows you to register which showdown user you are for our ladder.')
                .addStringOption((opt) => {
                    opt.setName('username');
                    opt.setDescription('The showdown user that you use.');
                    opt.setRequired(true);
                    return opt;
                })
        )
    }

    public async invoke(ctx: CommandContext) {
        const username = ctx.args.getString('username');
        let player = await Player.findOne({ showdownUsername: username});

        if(!player) {
            let newPlayer = new Player({
                showdownUsername: username
            });

            player = await newPlayer.save();
        }

        if (player.discordId && player.discordId !== "") {
            await ctx.sendMessageToReply({
                content: "It seems that user is already associated with another discord user. Please contact staff if this is seems to be incorrect.",
                ephemeral: true,
            });
            return;
        }

        player.discordId = ctx.interaction.user.id;
        await player.save();
        const embed = new EmbedBuilder();

        embed.setTitle('Connection Successful');
        embed.setDescription(`Connected the showdown user to your discord user.`);
        embed.addFields([
            { name: "How this works!", value: "This will allow you to take part in our ladder system. When you take part in a battle, make sure to use this showdown username, and make sure to save the replays. This is when your elo will be determined!"},
            { name: "Is there a limition to how many showdown usernames i can have attached to my discord user?", value: "There is no limit. The limit is the only one discord user can be associated with a showdown username. But you can be associated to multiple showdown users as you want."},
        ]);
        embed.setColor('Green');
        await ctx.sendMessageToReply({
            embeds: [embed],
            ephemeral: true,
        })
    }
}