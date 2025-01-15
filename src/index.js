// Imported styles
import "./css/normalize.css";
import "./css/styles.css";

// Imported media

// Imported scripts
import Character from "./scripts/character";
import limitLV from "./scripts/limitLV";
import Limit from "./scripts/limit";


const cloud = new Character("cloud",
    [
        new limitLV(0, new Limit("Braver", 8), new Limit("Cross-slash")),
        new limitLV(120, new Limit("Blade Beam", 7), new Limit("Climhazzard")),
        new limitLV(200, new Limit("Meteorain", 6), new Limit("Finishing Touch")),
    ]
);
cloud.logCharacter();

cloud.addKill();
cloud.addKill();
cloud.logCharacter();

cloud.removeKill();
cloud.logCharacter();