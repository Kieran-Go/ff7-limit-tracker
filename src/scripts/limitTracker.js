// Imported scripts
import * as dom from "./domUtility";

const limitTracker = (char) => {
    // Container of all page content
    const container = document.querySelector(".container");
    // The container with which all individual character data and functionality is displayed
    const characterElement = dom.newElement("div", "", null, ["character"]);
    container.appendChild(characterElement);

    // Initialize the limit tracker
    const init = () => {
        characterElement.appendChild(createCharacterHead());
        characterElement.appendChild(createStatsMenu());
    };

    // Creates the character head - which contains their portrait and name
    const createCharacterHead = () =>{
        const head = dom.newElement("div", null, null, ["character-head"]);

        // Import and append the character portrait
        import(`../media/images/${char.name}.png`)
        .then((img) => {
            head.appendChild(dom.newImg(img.default, null, null, ["portrait"]));
        })
        // Append the character name
        .then(() => {
            head.appendChild(dom.newElement("p", char.name, null));
        });
        return head;
    };

    // Create the stats menu
    const createStatsMenu = () => {
        const statsDiv = dom.newElement("div", "", null, ["stats"]);

        statsDiv.appendChild(createLvRadios());
        statsDiv.appendChild(createLimitContainer());

        return statsDiv;
    };

    // Create the radio buttons that are used to switch the character's LV status
    const createLvRadios = () => {
        const radioFieldset = dom.newElement("fieldset", "", null, ["lv-radios"]);
        radioFieldset.appendChild(dom.newElement("legend", "Limit LV"));

        // Create a radio button for each limit LV
        for(let i = 0; i < char.limitLVs.length; i++){
            const lbl = dom.newLabel(`lv${i+1}`);

            const rad = dom.newInput("radio", `${char.name}-radio-${i+1}`, [], `level${i}`);
            rad.value = `lv${i+1}`;
            if(!char.limitLVs[i].unlocked) rad.disabled = true;

            lbl.appendChild(rad);
            lbl.appendChild(document.createTextNode(` LV${i+1}`));
            
            radioFieldset.appendChild(lbl);
        }

        return radioFieldset;
    };

    // Create the container and content for all limit information 
    const createLimitContainer = () => {
        const limitFieldset = dom.newElement("fieldset", "", null, ["limit"]);

        // Find which limit LV is selected
        let selectedLV = null;
        for(let i = 0; i < char.limitLVs.length; i++){
            if(char.limitLVs[i].selected) selectedLV = char.limitLVs[i];
        }
        // Set to limitLV 1 by default
        if(!selectedLV){
            char.limitLVs[0].selected = true;
            selectedLV = char.limitLVs[0];
        }
         
        // Legend
        limitFieldset.appendChild(dom.newElement("legend", selectedLV.limit.getName(), null, ["limit-name"]));
        // Use count
        limitFieldset.appendChild(dom.newElement("p", `Used: ${selectedLV.limit.getUses()} / ${selectedLV.limit.getMaxUses()}`));

        return limitFieldset;

    };

    return { init };
};

export default limitTracker;