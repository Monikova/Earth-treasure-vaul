import { Schema, model, Types } from "mongoose";

const stoneSchema = new Schema({
    name: {
        type: String, 
        required: true,
        minLength: 2, 
    }, 
    category: {
        type: String, 
        required: true, 
        minLength: 3,
    },
    color: {
        type: String, 
        required: true,
        minLength: 2,
    },
    image: {
        type: String, 
        required: true, 
        validate: /^https?:\/\//,
    },
    location: {
        type: String, 
        required: true, 
        minLength: 5,
        maxLength: 15,
    },
    formula: {
        type: String, 
        required: true, 
        minLength: 3,
        maxLength: 30,
    },
    description: {
        type: String, 
        required: true, 
        minLength: 10,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
    likedList: [{
        type: Types.ObjectId,
        ref: 'User', 
    }],
}); 

const Stone = model('Stone', stoneSchema);

export default Stone; 