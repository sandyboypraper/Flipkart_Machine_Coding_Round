export default class {
    constructor({id, name, gender, vaccine_id}){
        this.id = id || Math.floor(Math.random() * 10000);
        this.name = name;
        this.gender = gender;
        this.vaccine_id = vaccine_id;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getVaccineId(){
        return this.vaccine_id;
    }
}