import { BaseCommand } from "../../../bases/BaseCommand";
import {SlashCommandBuilder} from "discord.js";
import CommandContext from "../../../contexts/CommandContext";
import {client} from "../../../core/client";
export default class EmitCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('emit')
                .setDescription('Emits Events')
                .addStringOption((options) => {
                    options.setName('event');
                    options.setDescription('The name of the event');
                    options.setRequired(true);
                    return options;
                })
        );
    }

    public async invoke(ctx:CommandContext) {
        let eventName = ctx.args.getString('event');
        if (!eventName) {
            // TODO: Added in a message to a missing argument
            return;
        }

        if (ctx.interaction.user.id !== "304446682081525772") {
            return;
        }

        client.discord.emit(eventName, ctx.interaction.user);
        await ctx.sendMessageToReply({
            ephemeral: true,
            content: `Running ${eventName}`,
        })
    }
}