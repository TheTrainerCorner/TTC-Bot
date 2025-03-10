import { GuildMember } from "discord.js";
import BaseEvent from "../../../../bases/BaseEvent";
import { client } from "../../../../core/client";

export default class GuildMemberAdd extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }

    public async invoke(member: GuildMember) {
        const notVerifiedRoleId = '1347046840868278322';

        const role = await member.guild.roles.fetch(notVerifiedRoleId);

        if (!role) return console.log('Could not find the Not Verified Role');

        await member.roles.add(role);
    }
}