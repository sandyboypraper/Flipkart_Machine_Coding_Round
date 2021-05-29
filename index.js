import CoFlipService from "./Services/CoFlipService.js";

import Center from "./Models/Center.js";
import Slot from "./Models/Slot.js";
import User from "./Models/User.js";
import Vaccine from "./Models/Vaccine.js";

let coFlipService = new CoFlipService();

function registerUser(){
    // input user details //name //vaccine_type
    let name = document.getElementById("registration-user-name").value;
    let vaccine_type = document.getElementById("registration-vaccine_type").value;
    let gender = document.getElementById("registration-gender").value;

    let vaccine = coFlipService.addOrGetVaccine(vaccine_type);

    let user = new User({
        name : name,
        gender : gender,
        vaccine_id : vaccine.getId()
    })

    coFlipService.addUser(user);
    console.log("users", coFlipService.getUsers());
}

function registerCenter(){
    // input centerId vaccine_type quantity
    let centerId = document.getElementById("registration-ceter-id").value;
    let vaccine_type = document.getElementById("registration-center-vaccine-type").value;
    let quantity = document.getElementById("registration-ceter-quyantity").value;

    if(quantity < 0){
        console.log("Wrong quantity!");
        return;
    }

    let vaccine = coFlipService.addOrGetVaccine(vaccine_type);

    let center = new Center({
        id : centerId,
        quantity,
        vaccine_id : vaccine.getId()
    })

    coFlipService.addCenter(center);
    console.log("centers" , coFlipService.getCenters());
}

function getCenters()
{
    // input user name
    let user_name = document.getElementById("username-get-centers").value;

    let user = coFlipService.getUserByName(user_name);    
    let preferred_vaccine  = user.getVaccineId();
    
    let preferred_centers = coFlipService.getCentersByVaccine(preferred_vaccine);

    preferred_centers.sort((center1, center2) => {
        let center1_q = center1.getQuantity();
        let center2_q = center2.getQuantity();

        if(center1_q > center2_q)return -1;
        else if(center1_q < center2_q)return 1;

        if(coFlipService.getNumberOfSlotsByCenter(center1) > coFlipService.getNumberOfSlotsByCenter(center2))
            return -1;

        return 1;
    })

    console.log("preffered centers", preferred_centers)
}


function bookSlot(){
    // user_name, centerid, day
    let user_name = document.getElementById("username").value;
    let centerId = document.getElementById("centerid").value;
    let day = document.getElementById("day").value;
    let slot_type = document.getElementById("slot_type").value;

    let user = coFlipService.getUserByName(user_name);

    let slot = new Slot({
        user_id : user.getId(),
        center_id : centerId,
        day,
    })

    if(coFlipService.isValidSlot(slot)){
        console.log("Created");
        coFlipService.addSlot(slot);
    }else{
        console.log("Can not be created");
    }
}

function getStats(){
    let slots = coFlipService.getSlots();
    for(let i in slots){
        let user = coFlipService.getUserById(slots[i].getUserId());
        console.log(user.getName(), "\n");

        let center = coFlipService.getCenterById(slots[i].getCenterId());
        console.log(center.getId(), " ", center.getQuantity());
    }
}

function UISetUp(){
    document.getElementById("add-user").addEventListener('click', () => {
        registerUser();
    })

    document.getElementById("add-center").addEventListener('click' , () => {
        registerCenter();
    })

    document.getElementById("get-centers").addEventListener('click' , () => {
        getCenters();
    })

    document.getElementById("book-slot").addEventListener('click' , () => {
        bookSlot();
    })

    document.getElementById("stats").addEventListener('click' , () => {
        getStats();
    })
}

UISetUp();