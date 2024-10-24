import Stone from "../models/Stone.js";

const stoneService = {
    create(stone, userId) {
        return Stone.create({...stone, owner: userId}); 
    },
    getAll() {
        return Stone.find();
    },
    getOne(stoneId) {
        return Stone.findById(stoneId);
    }
}; 

export default stoneService;