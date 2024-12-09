import { Embed, EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import BaseEvent from "../../../../bases/BaseEvent";
import { client } from "../../../../core/client";

export default class GuildMemberRemove extends BaseEvent {
	constructor() {
		super('guildMemberRemove');
	}

	public async invoke(member: GuildMember) {
		const embed = new EmbedBuilder();

		embed.setTitle('Member Left');
		embed.setAuthor({
			name: `${member}`,
			iconURL: member.displayAvatarURL(),
		});
		embed.setTimestamp(Date.now());
		embed.setColor('Orange');

		const verifyChannel = await client.discord.channels.fetch('1226043685817286717') as TextChannel;
		await verifyChannel.send({ embeds: [embed]});
	}
}