// Imported scripts
import * as dom from "./domUtility";

const limitTracker = (char) => {
    // Container of all page content
    const container = document.querySelector(".container");

    // The container for all character data and functionality
    const characterElement = dom.newElement("div", "", null, ["character"]);
    container.appendChild(characterElement);

    // Initialize the limit tracker
    const init = () => {
        // UI
        characterElement.appendChild(createCharacterHead());
        characterElement.appendChild(createStatsMenu());
        characterElement.appendChild(createKillsMenu());
        updateToNext();

        // Buttons
        initRadios();
        initButtons();
    };

    // Creates the character head - which contains their portrait and name
    const createCharacterHead = () =>{
        const head = dom.newElement("div", null, null, ["character-head"]);
        const name = char.name.replace(/-/g, ' ');

        // Import and append the character portrait
        import(`../media/images/${name}.png`)
        .then((img) => {
            head.appendChild(dom.newImg(img.default, null, null, ["portrait"]));
        })
        // Append the character name
        .then(() => {
            head.appendChild(dom.newElement("p", name, null));
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
        const radioFieldset = dom.newElement("fieldset", "", `${char.name}-radios`, ["lv-radios"]);
        radioFieldset.appendChild(dom.newElement("legend", "Limit LV"));

        const selectedLV = getSelectedLimitLV();
        // Create a radio button for each limit LV
        for(let i = 0; i < char.limitLVs.length; i++){
            const lbl = dom.newLabel(`lv${i+1}`);
            if(!char.limitLVs[i].unlocked) lbl.classList.add("disabled");

            const rad = dom.newInput("radio", `${char.name}-radio-${i+1}`, [], `${char.name}-LV`);
            rad.value = `lv${i+1}`;
            if(!char.limitLVs[i].unlocked) rad.disabled = true;
            if(char.limitLVs[i] === selectedLV) rad.checked = true;

            lbl.appendChild(rad);
            lbl.appendChild(document.createTextNode(` LV${i+1}`));
            
            radioFieldset.appendChild(lbl);
        }

        return radioFieldset;
    };

    // Create the container and content for all limit information 
    const createLimitContainer = () => {
        const limitFieldset = dom.newElement("fieldset", "", `${char.name}-limit`, ["limit"]);
        const selectedLV = getSelectedLimitLV();
         
        // Legend and use count
        limitFieldset.appendChild(dom.newElement("legend", selectedLV.limit.getName(), null, ["limit-name"]));
        limitFieldset.appendChild(dom.newElement("p", `Used: ${selectedLV.limit.getUses()} / ${selectedLV.limit.getMaxUses()}`, null, ["used"]));
        limitFieldset.appendChild(createButtons("limit"));
        return limitFieldset;
    };

    // Create the content for kills
    const createKillsMenu = () => {
        const killsContainer = dom.newElement("fieldset", "", null, ["kills-container"]);
        killsContainer.appendChild(dom.newElement("legend", "Kills"));

        // Kill count
        const killInfoDiv = dom.newElement("div", "", null, ["kill-info"]);
        killInfoDiv.appendChild(dom.newElement("p", `Count: ${char.kills}`, `${char.name}-kill-count`));

        // kills to next level
        let toNextLV = 0;
        if(getSelectedLimitLV() === char.limitLVs[0]) toNextLV = char.limitLVs[1].killReq;
        else if(getSelectedLimitLV() === char.limitLVs[1]) toNextLV = char.limitLVs[2].killReq;
        killInfoDiv.appendChild(dom.newElement("p", `To next LV: ${toNextLV}`, `${char.name}-to-next`));

        killsContainer.appendChild(killInfoDiv);

        // Buttons
        killsContainer.appendChild(createButtons("kill"));
        return killsContainer;
    };

    // Create the buttons
    const createButtons = (type = "limit") => {
        const btnDiv = dom.newElement("div", "", null, ["button-container"]);
        btnDiv.appendChild(dom.newElement("button", "+", `${char.name}-${type}-add`));
        btnDiv.appendChild(dom.newElement("button", "-", `${char.name}-${type}-remove`));
        return btnDiv;
    };

    // Find the selected limitLV
    const getSelectedLimitLV = () => {
        for(let i = 0; i < char.limitLVs.length; i++){
            if(char.limitLVs[i].selected) return char.limitLVs[i];
        }
        return char.limitLVs[0]; // select the first LV by default
    };

    const initRadios = () => {
        const radArray = document.querySelectorAll(`#${char.name}-radios label input`);
        for(let i = 0; i < radArray.length; i++){
            const rad = radArray[i];
            rad.addEventListener("click", () =>{
                if(!rad.disabled){
                    char.changeSelectedLV(i);
                    changeDisplayedLimit();
                }
            });
        }
    };

    const initButtons = () => {
        const addLimitBtn = document.getElementById(`${char.name}-limit-add`);
        addLimitBtn.addEventListener("click", () => {
            addLimitUse();
        });

        const removeLimitBtn = document.getElementById(`${char.name}-limit-remove`);
        removeLimitBtn.addEventListener("click", () => {
            removeLimitUse();
        });

        const addKillBtn = document.getElementById(`${char.name}-kill-add`);
        addKillBtn.addEventListener("click", () => {
            char.addKill();
            updateKillCount();
            checkForLevelUp();
            updateToNext();
        });

        const removeKillBtn = document.getElementById(`${char.name}-kill-remove`);
        removeKillBtn.addEventListener("click", () => {
            char.removeKill();
            updateKillCount();
            checkForLevelUp();
            updateToNext();
        });
    };

    const changeDisplayedLimit = () => {
        const selectedLV = getSelectedLimitLV();
        const limitName = document.querySelector(`#${char.name}-limit legend`);
        limitName.textContent = selectedLV.limit.getName();
        updateLimitUse();
    };

    const updateLimitUse = () => {
        const selectedLV = getSelectedLimitLV();
        const uses = document.querySelector(`#${char.name}-limit p`);
        uses.textContent = `Used: ${selectedLV.limit.getUses()} / ${selectedLV.limit.getMaxUses()}`;
    };

    const addLimitUse = () => {
        const selectedLV = getSelectedLimitLV();
        if(selectedLV.limit.getUses() != selectedLV.limit.getMaxUses()){
            selectedLV.limit.use();
            updateLimitUse();

            if(selectedLV.limit.getUses() === selectedLV.limit.getMaxUses()){
                // Show the unlock second limit msg
                console.log("Unlocked Blade Beam!");
            }
            return;
        }
        else{
            // Play the error SFX
            console.log("Max uses reached!");
        }
    };
    const removeLimitUse = () => {
        const selectedLV = getSelectedLimitLV();
        if(selectedLV.limit.getUses() > 0){
            selectedLV.limit.removeUse();
            updateLimitUse();
            return;
        }
        else{
            // Play the error SFX
            console.log("Uses cannot go below 0!");
        }
    };

    const updateKillCount = () => {
        const count = document.getElementById(`${char.name}-kill-count`);
        count.textContent = `Count: ${char.kills}`;
    };

    const checkForLevelUp = () => {
        for(let i = 0; i < char.limitLVs.length; i++){
            if(!char.limitLVs[i].unlocked){
                if(char.kills >= char.limitLVs[i].killReq){
                    char.limitLVs[i].unlocked = true;
                    enableRadios();
                }
            }
            else{
                if(char.kills < char.limitLVs[i].killReq){
                    char.limitLVs[i].unlocked = false;
                    enableRadios();
                    
                    // Change the selected LV to one that is not locked
                    const radArray = document.querySelectorAll(`#${char.name}-radios label input`);
                    for(let i = radArray.length - 1; i >= 0; i--){
                        if(!char.limitLVs[i].unlocked && char.limitLVs[i-1].unlocked && char.limitLVs[i].selected){
                            char.changeSelectedLV(i-1);
                            changeDisplayedLimit();
                            radArray[i-1].checked = true;
                        }
                    }
                }
            }
        }
    };

    const enableRadios = () => {
        const radLabels = document.querySelectorAll(`#${char.name}-radios label`);
        const radArray = document.querySelectorAll(`#${char.name}-radios label input`);

        for(let i = 0; i < radArray.length; i++){
            if(char.limitLVs[i].unlocked){
                radLabels[i].classList.remove("disabled");
                radArray[i].disabled = false;
            }
            else{
                radLabels[i].classList.add("disabled");
                radArray[i].disabled = true;
            }
        }
    };

    const updateToNext = () => {
        let toNextValue = 0;
        // First check that all the LVs aren't already unlocked
        if(!char.limitLVs[char.limitLVs.length - 1].unlocked){
            for(let i = 0; i < char.limitLVs.length; i++){
                // If the current limitLV is unlocked, but the next LV isn't
                if(char.limitLVs[i].unlocked && !char.limitLVs[i+1].unlocked){
                    // toNext = the the kill requirement of the next LV - the character's kill count
                    toNextValue = char.limitLVs[i+1].killReq - char.kills;
                };
            }
        }
        const toNextElement = document.getElementById(`${char.name}-to-next`);
        toNextElement.textContent = `To next LV: ${toNextValue}`;
    };

    return { init };
};

export default limitTracker;