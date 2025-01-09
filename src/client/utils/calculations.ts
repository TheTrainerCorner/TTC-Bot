export function calculateElo(oldElo: number, score: number, foeElo: number): number {
    // This is based on Showdown's Elo system.

    let K = 50;

    if (oldElo < 1100) {
        if (score < 0.5) K = 20 + (oldElo - 1000) * 30 / 100;
        else if (score > 0.5) K = 80 - (oldElo - 1000) * 30 / 100;
    } else if (oldElo > 1300) {
        K = 40;
    }

    // Main Elo Formula
    const E = 1 / (1 + Math.pow(10, (foeElo - oldElo) / 400));
    const newElo = oldElo + K * (score - E);

    return Math.max(newElo, 1000);
}