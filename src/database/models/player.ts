import { model, Schema } from "mongoose";

export interface IPlayer {
    discordId: string;
    showdownUsername: string;
    elo: number;
    wins: number;
    losses: number;
    matchesPlayed: number;
}

const PlayerSchema = new Schema<IPlayer>({
    discordId: { type: String, name: "discord_id" },
    showdownUsername: { type: String, name: "showdown_username" },
    elo: { type: Number, default: 1000 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    matchesPlayed: { type: Number, default: 0, name: "matches_played" },
});

export default model<IPlayer>("players", PlayerSchema);