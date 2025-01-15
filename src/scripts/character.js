export default class Character{
    constructor(name, limits){
        this._name = name,
        this._limits = limits,
        this._kills = 0;
    }

    // Getters
    get name(){
        return this._name;
    }
    get kills(){
        return this._kills;
    }
    get limits(){
        return this._limits;
    }

    // Setters
    set name(name){
        this._name = name;
    }
    set kills(kills){
        this._kills = kills;
    }
    set limits(limits){
        this._limits = limits;
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
        console.log({name: this._name, kills: this._kills, limits: this._limits});
    }
}