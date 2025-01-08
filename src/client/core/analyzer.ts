import { IAnalyzer } from "../interfaces/IReplay";

export class Analyzer implements IAnalyzer {
  data: {
    current: {
      p1: string;
      p2: string;
      p3?: string;
      p4?: string;
    };
    winner: string;
    p1: {
      username: string;
      pokemon: {
        nickname: string;
        pokemon: string;
        kills: number;
        inflicted: [string, string][];
        isDead: boolean;
      }[];
    };
    p2: {
      username: string;
      pokemon: {
        nickname: string;
        pokemon: string;
        kills: number;
        inflicted: [string, string][];
        isDead: boolean;
      }[];
    };
    p3?: {
      username: string;
      pokemon: {
        nickname: string;
        pokemon: string;
        kills: number;
        inflicted: [string, string][];
        isDead: boolean;
      }[];
    };
    p4?: {
      username: string;
      pokemon: {
        nickname: string;
        pokemon: string;
        kills: number;
        inflicted: [string, string][];
        isDead: boolean;
      }[];
    };
  } = {
    current: {
      p1: "",
      p2: "",
    },
    winner: "",
    p1: {
      username: "",
      pokemon: [],
    },
    p2: {
      username: "",
      pokemon: [],
    },
  };

  analyze(log: string): boolean {
    try {
	let lastCauseOfDamage = "";
      let lines = log.split("\n");
      for (let line of lines) {
        let sections = line.split("|");
        // We need to shift once to get rid of the white space in the front of the line.
        sections.shift();
        let action = sections.shift();
        switch (action) {
          case "player":
            if (sections[0] == "p1") {
              if (sections[1] !== this.data.p1!.username) {
                this.data.p1!.username = sections[1];
              }
            } else {
              if (sections[1] !== this.data.p2!.username) {
                this.data.p2!.username = sections[1];
              }
            }
            break;
          case "poke":
            if (sections[0] === "p1") {
              this.data.p1.pokemon.push({
                nickname: "",
                pokemon: sections[1].split(",")[0].replace("-*", ""),
                kills: 0,
                inflicted: [],
                isDead: false,
              });
            } else {
              this.data.p2.pokemon.push({
                nickname: "",
                pokemon: sections[1].split(",")[0].replace("-*", ""),
                kills: 0,
                inflicted: [],
                isDead: false,
              });
            }
            break;
          case "win":
            this.data.winner = sections[0];
            console.log("Done Analyzing!");
            /**
             * Structure
             * --------------------------------------
             * Winner: ----
             * Score: 0-0
             *
             * P1
             * Pokemon,0,0
             * Pokemon,0,0
             * Pokemon,0,0
             * Pokemon,0,0
             * Pokemon,0,0
             * Pokemon,0,0
             *
             * P2
             * Pokemon,0,0
             * Pokemon,0,0
             * Pokemon,0,0
             * Pokemon,0,0
             * Pokemon,0,0
             * Pokemon,0,0
             * ----------------------------------------
             */

            return true;
          case "detailschange":
            let tes = sections[0].split(":");
            if (tes[0].replace("a", "") === "p1") {
              this.data.p1.pokemon.find(
                (x) => x.pokemon === this.data.current.p1
              )!.pokemon = sections[1].includes(",")
                ? sections[1].split(",")[0]
                : sections[1];
              this.data.current.p1 = sections[1].includes(",")
                ? sections[1].split(",")[0]
                : sections[1];
            } else {
              this.data.p2.pokemon.find(
                (x) => x.pokemon === this.data.current.p2
              )!.pokemon = sections[1].includes(",")
                ? sections[1].split(",")[0]
                : sections[1];
              this.data.current.p2 = sections[1].includes(",")
                ? sections[1].split(",")[0]
                : sections[1];
            }
            break;
          case "switch":
          case "drag":
            let ste = sections[0].split(":");
            if (ste[0].replace("a", "") === "p1") {
              this.data.current.p1 = sections[1].includes(",")
                ? sections[1].split(",")[0]
                : sections[1];
              console.log(this.data.p1.pokemon);
              if (this.data.p1.pokemon.find((x) => x.pokemon = this.data.current.p1)!.nickname !== undefined)
              this.data.p1.pokemon.find(
                (x) => x.pokemon === this.data.current.p1
              )!.nickname = ste[1].trim();
            } else {
              this.data.current.p2 = sections[1].includes(",")
                ? sections[1].split(",")[0]
                : sections[1];
                if (this.data.p2.pokemon.find((x) => x.pokemon = this.data.current.p2)!.nickname !== undefined)
              this.data.p2.pokemon.find(
                (x) => x.pokemon === this.data.current.p2
              )!.nickname = ste[1].trim();
            }
            break;
          case "-status":
            // |-status|Cinccino|slp
            let sset = sections[0].split(":");
            if (sset[0].replace("a", "") === "p1") {
              let pokemon = this.data.p2.pokemon.find(
                (x) => x.pokemon === this.data.current.p2
              );
              pokemon?.inflicted.push([sections[1], this.data.current.p1]);
            } else if (sset[0].replace("a", "") === "p2") {
              let pokemon = this.data.p1.pokemon.find(
                (x) => x.pokemon === this.data.current.p1
              );
              pokemon?.inflicted.push([sections[1], this.data.current.p2]);
            }
            break;
          case "damage":
			if (sections.length == 2) {
				lastCauseOfDamage = sections[0].split(":")[0].replace("a", "") === "p1" ? this.data.current.p2 : this.data.current.p1;
			} else if (sections[2].split("[from] ")[1].startsWith("item")) {
				lastCauseOfDamage = "Item";
			} else {
				// Assume it is a status condition
				lastCauseOfDamage = `status:${sections[2].split("[from]")[1].trim()}`;
			}
            break;
          case "faint":
            let set = sections[0].split(":");
			if (set[0].replace("a", "") === "p1") {
				let poke = this.data.p1.pokemon.find(x => x.pokemon === set[1].trim() || x.nickname === set[1].trim());
				poke!.isDead = true;
				if (lastCauseOfDamage.startsWith("status:")) {
					let opp = this.data.p2.pokemon.find(x => x.inflicted.includes([poke!.pokemon, lastCauseOfDamage.split(":")[1].trim()]));
					opp!.kills++;
				} else {
					let opp = this.data.p2.pokemon.find(x => x.pokemon === this.data.current.p2);
					opp!.kills++;
				}
			}
			else if (set[0].replace("a", "") === "p2") {
				let poke = this.data.p2.pokemon.find(x => x.pokemon === set[1].trim() || x.nickname === set[1].trim());
				poke!.isDead = true;
				if (lastCauseOfDamage.startsWith("status:")) {
					let opp = this.data.p1.pokemon.find(x => x.inflicted.includes([poke!.pokemon, lastCauseOfDamage.split(":")[1].trim()]));
					opp!.kills++;
				} else {
					let opp = this.data.p1.pokemon.find(x => x.pokemon === this.data.current.p1);
					opp!.kills++;
				}
			}
            break;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
