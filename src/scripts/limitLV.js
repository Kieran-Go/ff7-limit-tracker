export default class limitLV {
    constructor(killReq = 0, limit = null, unlocked = false) {
        this._killReq = killReq;
        this._limit = limit;
        this._unlocked = unlocked;
        this._selected = false;
    }

    // Getters
    get killReq() {
        return this._killReq;
    }
    get limit() {
        return this._limit;
    }
    get unlocked() {
        return this._unlocked;
    }
    get selected(){
        return this._selected;
    }

    // Setters
    set killReq(killReq) {
        this._killReq = killReq;
    }
    set limit(limit) {
        this._limit = limit;
    }
    set unlocked(unlocked) {
        this._unlocked = unlocked;
    }
    set selected(selected){
        this._selected = selected;
    }

    // Methods
    unlock(){
        this._unlocked = true;
    }
    lock(){
        this._unlocked = false;
    }
}
