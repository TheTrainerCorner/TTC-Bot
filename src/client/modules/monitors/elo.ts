import BaseMonitor from "../../bases/BaseMonitor";
import { Analyzer } from "../../core/analyzer";
import Player from "../../../database/models/player";
import player from "../../../database/models/player";
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

        const a = player1!.elo;
        const b = player2!.elo;

        const step1 = Math.floor(Math.round(b - a));
        const step2 = Math.floor(Math.round(step1 / 400));
        const step3 = Math.floor(Math.round(Math.pow(10, (step2 + 1))));
        const expected = Math.floor(Math.round(1 / step3));
        const ka = 20;
        const kb = 20;

        // const ka = a <= 1000 ? 40 :
        //             a >= 1000 && a <= 1200 ? 30 :
        //              a >= 1200 && a <= 1600 ? 20 :
        //               a >= 1600 ? 10 : 40;
        // const kb = b <= 1000 ? 40 :
        //             b >= 1000 && b <= 1200 ? 30 :
        //              b >= 1200 && b <= 1600 ? 20 :
        //               b >= 1600 ? 10 : 40;

        const aScore = Math.floor(Math.round(ka * ((data.winner === data.p1.username ? 1 : 0) - expected)));
        const bScore = Math.floor(Math.round(kb * ((data.winner === data.p2.username ? 1 : 0) - expected)));

        // const aScore = Math.floor(Math.round(ka * ((data.winner === data.p1.username ? 1 : 0) - expected)));
        // const bScore = Math.floor(Math.round(kb * ((data.winner === data.p2.username ? 1 : 0) - expected)));
        console.log(aScore);
        console.log(bScore);
        console.log(data.winner, data.p1.username, data.p2.username);
        player1.elo += aScore;
        player1.matchesPlayed++;
        player2.elo += bScore;
        player2.matchesPlayed++;
        if (data.winner === data.p1.username) {
            player1.wins++;
            player2.losses++;
        } else if (data.winner === data.p1.username) {
            player1.losses++;
            player2.wins++;
        }

        await player1.save();
        await player2.save();
    }
}