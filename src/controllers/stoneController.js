import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import stoneService from "../services/stoneService.js";

const stoneController = Router(); 

stoneController.get('/create', (req, res) => {
    res.render('create', {title: 'Create Page'});
});

stoneController.post('/create', async (req, res) => {
    const stone = req.body; 
    console.log(stone);
    const userId = req.user._id;

    try {
        await stoneService.create(stone, userId);
        res.redirect('/dashboard');
    } catch (err) {
        const error = getErrorMessage(err); 
        res.render('create', {title: 'Create Page', stone, error});
    }
});

export default stoneController;