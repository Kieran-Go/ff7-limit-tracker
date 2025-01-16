export default class Character{
    constructor(name, limitLVs, kills = 0){
        this._name = name,
        this._limitLVs = limitLVs,
        this._kills = kills;
    }

    // Getters
    get name(){
        return this._name;
    }
    get kills(){
        return this._kills;
    }
    get limitLVs(){
        return this._limitLVs;
    }

    // Setters
    set name(name){
        this._name = name;
    }
    set kills(kills){
        this._kills = kills;
    }
    set limitLVs(limitLVs){
        this._limitLVs = limitLVs;
    }

    // Methods
    addKill(){
        this._kills++;
    }

    removeKill(){
        if(this._kills === 0) return;
        this._kills--;
    }

    changeSelectedLV(lv){
        for(let i = 0; i < this._limitLVs.length; i++){
            const limitLV = this._limitLVs[i];
            if(lv === i) limitLV.selected = true;
            else limitLV.selected = false;
        }
    }

    logCharacter(){
        console.log({name: this._name, kills: this._kills, limitLVs: this._limitLVs});
    }
}