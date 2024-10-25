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
        // return Stone.findOne({stoneId});
    }, 
    like(stoneId, userId) {
        return Stone.findByIdAndUpdate(stoneId, {$push: {likedList: userId}});
    },
    remove(stoneId) {
        return Stone.findByIdAndDelete(stoneId);
        // return Stone.findOneAndDelete(stoneId);
    }
}; 

export default stoneService;