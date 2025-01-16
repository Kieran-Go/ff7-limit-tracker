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
        new limitLV(0, new Limit("Braver", 9), true),
        new limitLV(120, new Limit("Blade Beam", 7)),
        new limitLV(320, new Limit("Meteorain", 6)),
    ], 119
);
limitTracker(cloud).init();

// Barret
const barret = new Character("Barret",
    [
        new limitLV(0, new Limit("Big Shot", 9), true),
        new limitLV(80, new Limit("Grenade Bomb", 8)),
        new limitLV(160, new Limit("Satellite Beam", 6)),
    ]
);
limitTracker(barret).init();

// Tifa
const tifa = new Character("Tifa",
    [
        new limitLV(0, new Limit("Beat Rush", 9), true),
        new limitLV(96, new Limit("Waterkick", 7)),
        new limitLV(192, new Limit("Dolphin Blow", 6)),
    ]
);
limitTracker(tifa).init();

// Aerith
const aerith = new Character("Aerith",
    [
        new limitLV(0, new Limit("Healing Wind", 8), true),
        new limitLV(80, new Limit("Breath of the Earth", 6)),
        new limitLV(160, new Limit("Planet Protector", 5)),
    ]
);
limitTracker(aerith).init();

// Red XIII
const redXIII = new Character("Red-XIII",
    [
        new limitLV(0, new Limit("Sled Fang", 8), true),
        new limitLV(72, new Limit("Blood Fang", 7)),
        new limitLV(144, new Limit("Howling Moon", 6)),
    ]
);
limitTracker(redXIII).init();

// Cait Sith
const caitSith = new Character("Cait-Sith",
    [
        new limitLV(0, new Limit("Dice"), true),
        new limitLV(40, new Limit("Slots")),
    ]
);
limitTracker(caitSith).init();

// Cid
const cid = new Character("Cid",
    [
        new limitLV(0, new Limit("Boost Jump", 7), true),
        new limitLV(60, new Limit("Hyper Jump", 6)),
        new limitLV(136, new Limit("Dragon Dive", 5)),
    ]
);
limitTracker(cid).init();

// Yuffie
const yuffie = new Character("Yuffie",
    [
        new limitLV(0, new Limit("Greased Lightning", 8), true),
        new limitLV(64, new Limit("Landscaper", 7)),
        new limitLV(128, new Limit("Gauntlet", 6)),
    ]
);
limitTracker(yuffie).init();

// Vincent
const vincent = new Character("Vincent",
    [
        new limitLV(0, new Limit("Galian Beast"), true),
        new limitLV(40, new Limit("Death Gigas")),
        new limitLV(96, new Limit("Hellmasker")),
    ]
);
limitTracker(vincent).init();

