import Stone from "../models/Stone.js";

const stoneService = {
    create(stone, userId) {
        return Stone.create({...stone, owner: userId}); 
    },
    getAll(filter = {}) {
        const query = Stone.find();

        if(filter.search) {
            query.find({name: {$regex: filter.search, $options: 'i'}});
        }

        return query;
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
    }, 
    edit(stoneId, stone) {
        return Stone.findByIdAndUpdate(stoneId, stone, {runValidators: true});
    }, 
}; 

export default stoneService;