import axios from "axios";
export default class Grabbers {
  private static POKEDEX_URL = "https://play.thetrainercorner.net/data/pokedex.js";
  private static SPRITES_URL = "https://play.thetrainercorner.net/sprites/fakemons/";
  private static SHOWDOWN_SPRITES_URL = "https://play.pokemonshowdown.com/sprites/gen5/";
  private static LEARNSET_URL = "https://play.thetrainercorner.net/data/learnsets.js";
  private static MOVES_URL = "https://play.thetrainercorner.net/data/moves.js";
  private static ABILITIES_URL = "https://play.thetrainercorner.net/data/abilities.js";
  private static TIERS_URL = "https://play.thetrainercorner.net/data/formats-data.js";
  private static TYPECHART_URL = "https://play.thetrainercorner.net/data/typechart.js";
  
  // Base Data
  private static SMOGON_POKEDEX_URL = "https://play.pokemonshowdown.com/data/pokedex.js";
  private static SMOGON_LEARNSET_URL = "https://play.pokemonshowdown.com/data/learnsets.js";
  private static SMOGON_MOVES_URL = "https://play.pokemonshowdown.com/data/moves.js";
  private static SMOGON_ABILITIES_URL = "https://play.pokemonshowdown.com/data/abilities.js";
  private static SMOGON_TIERS_URL = "https://play.pokemonshowdown.com/data/formats-data.js";
  private static SMOGON_TYPECHART_URL = "https://play.pokemonshowdown.com/data/typechart.js";
  
  public static async getPokedex() {
    let buf = await axios.get(this.POKEDEX_URL);
    let data = buf.data;
    let pokedex = eval(data);
    return pokedex;
  }
  public static async getLearnset() {
    let buf = await axios.get(this.LEARNSET_URL);
    let data = buf.data;
    let learnset = eval(data);
    return learnset;
  }
  public static async getMoves() {
    let buf = await axios.get(this.MOVES_URL);
    let data = buf.data;
    let moves = eval(data);
    return moves;
  }
  public static async getAbilities() {
    let buf = await axios.get(this.ABILITIES_URL);
    let data = buf.data;
    let abilities = eval(data);
    return abilities;
  }
  public static getSprites(name: string, fakemon: boolean = false) {
    return fakemon ? `${this.SPRITES_URL}${name.toLowerCase().replace(" ", "").replace("-", "")}.png` : `${this.SHOWDOWN_SPRITES_URL}${name.toLowerCase().replace(" ", "")}.png`;
  }

  public static async getBasePokedex() {
    let buf = await axios.get(this.SMOGON_POKEDEX_URL);
    let data = buf.data;
    let pokedex = eval(data);
    return pokedex;
  }
  
  public static async getBaseLearnset() {
    let buf = await axios.get(this.SMOGON_LEARNSET_URL);
    let data = buf.data;
    let learnsets = eval(data);
    return learnsets;
  }

  public static async getBaseMove() {
    let buf = await axios.get(this.SMOGON_MOVES_URL);
    let data = buf.data;
    let moves = eval(data);
    return moves;
  }

  public static async getBaseAbilities() {
    let buf = await axios.get(this.SMOGON_ABILITIES_URL);
    let data = buf.data;
    let abilities = eval(data);
    return abilities;
  }
}