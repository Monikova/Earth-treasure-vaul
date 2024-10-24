import Stone from "../models/Stone.js";

const stoneService = {
    create(stone, userId) {
        return Stone.create({...stone, owner: userId}); 
    },
}; 

export default stoneService;