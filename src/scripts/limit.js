export default class Limit{
    constructor(name, maxUses){
        this._name = name,
        this._uses = 0,
        this._maxUses = maxUses,
        this._unlocked = false;
    }

    // getters
    getName(){
        return this._name;
    }
    getUses(){
        return this._uses;
    }
    getMaxUses(){
        return this._maxUses;
    }
    getUnlocked(){
        return this._unlocked;
    }

    // setters
    setName(name){
        this._name = name;
    }
    setUses(uses){
        this._uses = uses;
    }
    setMaxUses(maxUses){
        this._maxUses = maxUses;
    }
    setUnlocked(unlocked){
        this._unlocked = unlocked;
    }

    // Methods
    use(){
        if(this._uses === this._maxUses) return;
        this._uses++;
    }

    removeUse(){
        if(this._uses === 0) return;
        this._uses--;
    }

    unlock(){
        this._unlocked = true;
    }

    lock(){
        this._unlocked = false;
    }

}