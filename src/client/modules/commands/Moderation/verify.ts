import { EmbedBuilder, GuildMemberRoleManager, SlashCommandBuilder, TextChannel } from 'discord.js';
import { BaseCommand } from '../../../bases/BaseCommand';
import CommandContext from '../../../contexts/CommandContext';
export default class VerifyCommand extends BaseCommand {
	constructor() {
		super(new SlashCommandBuilder().setName('verify').setDescription('Verifys you to gain access to our server!'));
	}

	async invoke(ctx: CommandContext) {
		console.log(ctx.interaction.channelId);
		if (ctx.interaction.channelId !== "1226038210174517299") {
			ctx.sendMessageToReply({
				ephemeral: true,
				content: "This command can not be used outside the verification channel!",
			});
			return;
		}

		if ((ctx.interaction.member!.roles as GuildMemberRoleManager).cache.has('997670503256965171')) {
			ctx.sendMessageToReply({
				ephemeral: true,
				content: "You already have the members role. You do not need to verify yourself again ^-^!",
			});
			return;
		}

		let user = ctx.interaction.user;

		const userDate = user.createdAt;
		const today = new Date(Date.now());

		const diff = Math.abs(today.getTime() - userDate.getTime());
		const monthsBetween = Math.ceil(diff/2629800000);
		if (monthsBetween < 12) {
			// They will need a staff member to verify them!
			await ctx.sendMessageToReply({
				ephemeral: true,
				content: `Due to your account being less than a year older, you will not be able to verify yourself. I will let a staff member know, and they will verify you!`,
			});

			let channel = ctx.interaction.guild?.channels.cache.get("1226043685817286717");

			let embed = new EmbedBuilder();

			embed.setTitle(`STAFF VERIFICATION REQUIRED!!!`);
			embed.setAuthor({
				name: `${user.username}`,
				iconURL: user.displayAvatarURL(),
			});
			embed.setDescription(`${user}'s account is younger than 1 year! Staff Approval is needed!\nIf they are ok, please give them the <@&997670503256965171>!`);
			embed.addFields({name: `Account's Created Date`, value: `${user.createdAt.toDateString()}`});
			embed.setColor(`Red`);

			embed.setTimestamp(new Date(Date.now()));

			await (channel as TextChannel).send({
				embeds: [embed],
				content: `<@&997662979208261632>`,
			});
			return;
		}
		
		const notVerifiedRoleId = "1347046840868278322";
		await (ctx.interaction.member!.roles as GuildMemberRoleManager).add("997670503256965171");
		await (ctx.interaction.member!.roles as GuildMemberRoleManager).remove(notVerifiedRoleId);
		
		let embed = new EmbedBuilder();
		embed.setTitle('You are now Verified!');
		embed.setDescription(`Enjoy your stay in The Trainer's Corner!`);
		embed.setAuthor({
			name: `${ctx.interaction.user.username}`,
			iconURL: ctx.interaction.user.displayAvatarURL(),
		});
		embed.setColor('Green');

		await ctx.sendMessageToReply({
			ephemeral: true,
			embeds: [embed],
		});
		embed = new EmbedBuilder();
		embed.setTitle(`Verification Passed!`);
		embed.setDescription(`Member: ${ctx.interaction.member}`);
		embed.setAuthor({name: `${ctx.interaction.user.username}`, iconURL: ctx.interaction.user.displayAvatarURL()});
		embed.setColor(`Green`);
		let channel = ctx.interaction.guild?.channels.cache.get("1226043685817286717");

		await (channel as TextChannel).send({
			embeds: [embed],
		})
	}
}