import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from '../lib/jwt.js';

const userService = {
    async register(username, email, password, rePassword) {
        const user = await User.findOne({$or: [{email}, {username}]});

        if (password !== rePassword) {
            throw new Error('Password mismatch');
        }

        if(user) {
            throw new Error('User already exists');
        }

        const newUser = await User.create({
            username, 
            email, 
            password,
        });

        return this.generateToken(newUser);
    },
    async login(email, password) {
        const user = await User.findOne({email});

        if (!user) {
            throw new Error('User doesn\'t exist');
        }
        
        const isValid = await bcrypt.compare(password, user.password); 
        if (!isValid) {
            throw new Error('Invalid password!'); 
        }

        return this.generateToken(user);
    }, 
    async generateToken(user) {
        const payload = {
            _id: user._id, 
            email: user.email,
            username: user.username,
        }; 

        const secret = process.env.JWT_SECRET;
        const token = await jwt.sign(payload, secret, {expiresIn: '2h'});
        return token;
    }
};

export default userService;