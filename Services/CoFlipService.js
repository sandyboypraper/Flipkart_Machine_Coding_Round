import Vaccine from "../Models/Vaccine.js";

export default class CoFlipService{
    constructor(){
        this.users = [];
        this.centers = [];
        this.slots = [];
        this.vaccines = [];
    }

    //user
    getUsers(){
        return this.users;
    }

    getUserById(user_id){
        return this.users.filter(user => user.getId() == user_id)[0];
    }

    getUserByName(user_name){
        return this.users.filter((user) => user.getName() == user_name)[0];
    }

    setUsers(users){
        this.users = users;
    }

    addUser(user){
        this.users = [...this.users, user];
    }



    //centers
    getCenters(){
        return this.centers;
    }

    getCenterById(center_id){
        return this.centers.filter((center) => center.getId() == center_id)[0];
    }

    getCentersByVaccine(vaccine_id){
        let centers = this.centers.filter((center) => {
            return center.getVaccineId() == vaccine_id
        });
        return centers;
    }

    setCenters(centers){
        this.centers = centers
    }

    addCenter(center){
        this.centers = [...this.centers, center];
    }


    //slots
    getSlots(){
        return this.slots;
    }

    getSlotsByUser(user_id){
        return this.slots.filter((slot) => slot.getUserId() == user_id);
    }

    getNumberOfSlotsByCenter(center){
        return this.slots.filter((slot) => slot.getCenterId() == center.getId()).length;
    }

    setSlots(slots){
        this.slots = slots;
    }

    addSlot(slot)
    {
        let center = this.getCenterById(slot.getCenterId());
        center.setQuantity(center.getQuantity() - 1);
        this.slots = [...this.slots, slot];
    }

    isValidSlot(slot){
        //user_id , center_id, day
        let isCenterAvailable = this.getCenterById(slot.getCenterId()).getQuantity() > 0;
        if(!isCenterAvailable) return false;

        let slotsAvailableForUser = this.getSlotsByUser(slot.getUserId());
        if(slotsAvailableForUser.length == 2) return false;
        if(slotsAvailableForUser.length == 1 && slotsAvailableForUser[0].getDay() - slot.getDay() <= 10) return false;

        return true;
    }


    //vaccine
    getVaccines(){
        return this.vaccines;
    }

    setVaccine(vaccines){
        this.vaccines = vaccines;
    }

    addOrGetVaccine(vaccine_type){
        let vaccines_arr = this.vaccines.filter((vaccine) => vaccine.getVaccineType() == vaccine_type);
        if(vaccines_arr.length == 0)
            {
                let newVaccine = new Vaccine({vaccine_type});
                this.vaccines = [...this.vaccines, newVaccine];
                return newVaccine;
            }

        return vaccines_arr[0];        
    }

}
