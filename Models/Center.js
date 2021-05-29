export default class {
    constructor({id, quantity, vaccine_id}){
        this.id = id || Math.floor(Math.random() * 10000);
        this.quantity = quantity;
        this.vaccine_id = vaccine_id;
    }

    getId(){
        return this.id;
    }

    getVaccineId(){
        return this.vaccine_id;
    }

    getQuantity(){
        return this.quantity;
    }

    setQuantity(quantity){
        this.quantity = quantity;
    }
}