// Imported styles
import "./css/normalize.css";
import "./css/styles.css";
// Imported Classes
import Character from "./scripts/character";
import limitLV from "./scripts/limitLV";
import Limit from "./scripts/limit";
// Imported scripts
import limitTracker from "./scripts/limitTracker";

// Cloud
const cloud = new Character("Cloud",
    [
        new limitLV(0, new Limit("Braver", 8), true),
        new limitLV(120, new Limit("Blade Beam", 7), false),
        new limitLV(200, new Limit("Meteorain", 6), false),
    ]
);
limitTracker(cloud).init();

