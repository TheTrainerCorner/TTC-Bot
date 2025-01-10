import BaseMonitor from "../../bases/BaseMonitor";
import { Analyzer } from "../../core/analyzer";
import Player from "../../../database/models/player";
import player from "../../../database/models/player";
import { calculateElo } from "../../utils/calculations";
export default class EloMonitor extends BaseMonitor {
    constructor() {
        super('elo');
    }

    public async invoke(analyzer: Analyzer) {
        const data = analyzer.data;

        let player1 = await Player.findOne({ showdownUsername: data.p1.username});
        let player2 = await Player.findOne({ showdownUsername: data.p2.username});

        if (!player1) {
            const newPlayer = new Player({
                discordId: "",
                showdownUsername: data.p1.username,
            });
            player1 = await newPlayer.save();
        }
        if (!player2) {
            const newPlayer = new Player({
                discordId: "",
                showdownUsername: data.p2.username,
            });
            player2 = await newPlayer.save();
        }

        // This is using Showdown's elo system.
        // The K factor determines how much your elo changes when you win or lose games.
        // Larger K means more change.
        // In the "original" Elo, K is constant, but it's common for K to
        // get smaller as your rating goes up
        
        // Scores: 1 = Win, 0.5 = Draw, 0 = Losses; Draws are very unlikely to happen.
        const p1score = data.winner === data.p1.username ? 1 : data.winner === '' ? 0.5 : 0;
        const p2score = data.winner === data.p2.username ? 1 : data.winner === '' ? 0.5 : 0;

        const p1NewElo = calculateElo(player1.elo, p1score, player2.elo);
        const p2NewElo = calculateElo(player2.elo, p2score, player1.elo);

        player1.elo = Math.floor(Math.round(p1NewElo));
        player2.elo = Math.floor(Math.round(p2NewElo));

        if (data.winner === data.p1.username) {
            player1.wins++;
            player2.losses++
        } else if (data.winner === data.p2.username) {
            player1.losses++;
            player2.wins++;
        }

        player1.matchesPlayed++;
        player2.matchesPlayed++;

        await player1.save();
        await player2.save();
    }
}