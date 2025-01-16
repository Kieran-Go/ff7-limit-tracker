export default class Character{
    constructor(name, limitLVs){
        this._name = name,
        this._limitLVs = limitLVs,
        this._kills = 0;
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

    logCharacter(){
        console.log({name: this._name, kills: this._kills, limitLVs: this._limitLVs});
    }
}