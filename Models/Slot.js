export default class Slot{
    constructor({id, user_id, center_id, day, slot_type}){
        this.id = id || Math.floor(Math.random() * 10000);
        this.user_id = user_id;
        this.center_id = center_id;
        this.day = day;
        this.slot_type = slot_type || "any_time";
    }

    getUserId(){
        return this.user_id;
    }

    getCenterId(){
        return this.center_id;
    }

    getSlotType(){
        return this.slot_type;
    }

    getDay(){
        return this.day;
    }
}