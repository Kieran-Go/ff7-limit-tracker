export default class limitLV {
    constructor(killReq = 0, limitOne = null, limitTwo = null) {
        this._killReq = killReq;
        this._limitOne = limitOne;
        this._limitTwo = limitTwo;
        this._unlocked = false;
    }

    // Getters
    get killReq() {
        return this._killReq;
    }
    get limitOne() {
        return this._limitOne;
    }
    get limitTwo() {
        return this._limitTwo;
    }
    get unlocked() {
        return this._unlocked;
    }

    // Setters
    set killReq(killReq) {
        this._killReq = killReq;
    }
    set limitOne(limitOne) {
        this._limitOne = limitOne;
    }
    set limitTwo(limitTwo) {
        this._limitTwo = limitTwo;
    }
    set unlocked(unlocked) {
        this._unlocked = unlocked;
    }

    // Methods
    unlock(){
        this._unlocked = true;
    }
    lock(){
        this._unlocked = false;
    }
}
