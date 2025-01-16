export default class Limit{
    constructor(name, maxUses = 0){
        this._name = name,
        this._uses = 0,
        this._maxUses = maxUses;
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

    // Methods
    use(){
        if(this._uses === this._maxUses) return;
        this._uses++;
    }

    removeUse(){
        if(this._uses === 0) return;
        this._uses--;
    }
}