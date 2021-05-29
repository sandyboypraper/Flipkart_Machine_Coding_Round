export default class {
    constructor({id, vaccine_type}){
        this.id = id || Math.floor(Math.random() * 10000);
        this.vaccine_type = vaccine_type;
    }

    getId(){
        return this.id;
    }

    getVaccineType(){
        return this.vaccine_type;
    }
}