export interface IAnalyzer {
  data?: {
    current: {
      p1: string,
      p2: string,
      p3?: string,
      p4?: string,
    },

    winner: string,
    p1: {
      username: string,
      pokemon?: {
        nickname: string,
        pokemon: string,
        kills: number,
		inflicted: [string, string][],
        isDead: boolean,
      }[],
    },
    p2: {
      username: string,
      pokemon?: {
        nickname: string,
        pokemon: string,
        kills: number,
		inflicted: [string, string][],
        isDead: boolean,
      }[],
    },
    p3?: {
      username: string,
      pokemon: {
        nickname: string,
        pokemon: string,
        kills: number,
		inflicted: [string, string][],
        isDead: boolean,
      }[],
    },
    p4?: {
      username: string,
      pokemon: {
        nickname: string,
        pokemon: string,
        kills: number,
		inflicted: [string, string][],
        isDead: boolean,
      }[],
    }
  };

  analyze(log: string, format: string): boolean;
}